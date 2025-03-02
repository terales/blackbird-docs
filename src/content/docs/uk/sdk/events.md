---
title: Визначення подій
description: Дізнайтеся, як визначати події вебхуків та зворотних викликів у проєкті Blackbird.
sidebar:
  label: События
  order: 5
---

Тригери є важливою частиною будь-якого оркестратора робочих процесів. Blackbird дозволяє визначати користувацькі події як тригери. Ці події зазвичай відповідають вебхукам у додатках, але вони також можуть бути URL-адресами зворотного виклику або працювати з використанням опитування.

## Вебхуки

Як і з діями, ми використовуємо атрибут `WebhookList`, щоб вказати Blackbird на наші вебхуки. Ви можете розділити свої вебхуки на декілька файлів, надаючи кілька класів, що реалізують `WebhookList`. Атрибут `Webhook` повинен бути доданий до кожного методу обробки вебхука. Подібно до дій, вони також мають назву та опис.

```cs
[WebhookList]
public class WebhookList : BaseInvocable
{

  // Just like with articles, we can define the display name and the description.
  [Webhook("On article published", typeof(ArticlePublishedHandler), Description = "On article published")]
  public async Task<WebhookResponse<ArticlePublishedResponse>> ArticlePublishedHandler(WebhookRequest webhookRequest,
    [WebhookParameter][Display("New status")][DataSource(typeof(ItemStatusDataHandler))] string? newStatus) // We can give an (optional, dynamic) parameter to webhooks as well
  {
    // Webhook handling methods usually start with deserializing the WebhookRequest
    var data = JsonConvert.DeserializeObject<ArticlePayloadTemplate<PublishEvent>>(webhookRequest.Body.ToString());
    if (data is null) { throw new InvalidCastException(nameof(webhookRequest.Body)); }

    // Return an instance of WebhookResponse
    return new WebhookResponse<ArticlePublishedResponse>
    {
      HttpResponseMessage = null,
      ReceivedWebhookRequestType = WebhookRequestType.Default,
      Result = new ArticlePublishedResponse
      {
        // Implement
      }
    };
  }
}
```

Деякі зовнішні системи можуть вимагати додаткові дані, наприклад, облікові дані, URL для надсилання корисного навантаження події тощо, перш ніж надсилати корисне навантаження події. Тому ми дозволяємо вам контролювати відповідь системі та визначати, чи потрібно запускати робочий процес із певними обліковими даними.

Платформа Blackbird передає всі параметри запиту до об'єкта `WebhookRequest`. Це включає HTTP-метод, додаткові заголовки тощо. Ви можете використати це, щоб вирішити, як обробляти цей запит.

У класі `WebhookResponse`, який ви повертаєте, ви можете сигналізувати Blackbird, чи повинен цей вхідний запит запустити робочий процес чи ні. Якщо ви не хочете запускати робочий процес, встановіть `ReceivedWebhookRequestType` на `WebhookRequestType.Preflight`.

Ви також можете контролювати, яке повідомлення буде надіслано назад до сервісу, що викликає, надаючи `HttpResponseMessage`. Якщо надано `null`, Blackbird за замовчуванням надсилає відповідь `204 no content`.

Усі властивості, передані до реалізації класу `Result`, будуть доступні в редакторі робочого процесу. Усі атрибути `Display` також можливі тут.

> **💡 Примітка**: Назва вашого методу вебхука не може бути змінена, Blackbird інтерпретуватиме це як видалену і знову створену подію.

### Автоматична підписка та відписка

Щоб визначити автоматичну підписку та відписку від вебхуків, ви можете реалізувати екземпляр `IWebhookEventHandler` і прикріпити його до вебхука як другий аргумент (див. приклад вище `typeof(ArticlePublishedHandler)`).

Обробник подій вебхука має два методи: `SubscribeAsync` та `UnsubscribeAsync`. Вони запускаються при публікації робочого процесу та при скасуванні публікації/видаленні відповідно. Обидва методи повинні реалізовувати виклики API, які створюють/видаляють вебхуки.

Приклад реалізації з додатку Zendesk показано нижче:

```cs
public class BaseWebhookHandler : BaseInvocable, IWebhookEventHandler
{
  private IEnumerable<AuthenticationCredentialsProvider> Creds => InvocationContext.AuthenticationCredentialsProviders;

  private string SubscriptionEvent;
  private ZendeskClient Client { get; }

  public BaseWebhookHandler(InvocationContext invocationContext, string subEvent) : base(invocationContext)
  {
    SubscriptionEvent = subEvent;
    Client = new ZendeskClient(invocationContext);
  }

  public async Task SubscribeAsync(IEnumerable<AuthenticationCredentialsProvider> authenticationCredentialsProvider, Dictionary<string, string> values)
  {
    var request = new ZendeskRequest($"/api/v2/webhooks", Method.Post, Creds);
    request.AddNewtonJson(new
    {
      webhook = new
      {
        name = SubscriptionEvent,
        description = "",
        // The values["payloadUrl"] contains the URL that the other application can call when the event occurs
        endpoint = values["payloadUrl"],
        status = "active",
        http_method = "POST",
        request_format = "json",
        subscriptions = new[]
        {
            SubscriptionEvent
        }
      }
    });
    await Client.ExecuteAsync(request);
  }

  public async Task UnsubscribeAsync(IEnumerable<AuthenticationCredentialsProvider> authenticationCredentialsProvider, Dictionary<string, string> values)
  {
    // For Zendesk, first we have to fetch the ID of the webhook we created
    var getRequest = new ZendeskRequest($"/api/v2/webhooks?filter[name_contains]={SubscriptionEvent}", Method.Get, Creds);
    var webhooks = await Client.GetAsync<WebhooksListResponse>(getRequest);
    var webhookId = webhooks.Webhooks.First().Id;

    // Then we delete the webhook
    var deleteRequest = new ZendeskRequest($"/api/v2/webhooks/{webhookId}", Method.Delete, Creds);
    await Client.ExecuteAsync(deleteRequest);
  }
}
```

> **💡 Порада**: ви можете використовувати ID робочого процесу з контексту виклику для генерації унікальних ключів для кожної підписки, якщо потрібно.

### Обробка граничних випадків контрольних точок

Події можуть бути створені на початку робочого процесу, щоб діяти як тригер. Однак вони також можуть бути використані в середині робочого процесу як контрольна точка. Поширеним сценарієм для контрольної точки може бути _чекати, поки статус буде змінено на X_. В цьому є проблема: що робити, якщо статус вже був змінений на _X_ до того, як була створена підписка на вебхук?

Для вирішення цього граничного випадку ми також дозволяємо вам реалізувати `IAfterSubscriptionWebhookEventHandler<T>` в класі обробника вебхука. Цей інтерфейс вимагає реалізації методу `OnWebhookSubscribedAsync`. Цей метод викликається в момент підписки. Ви можете використати цей метод, щоб вже запустити першу подію негайно. У випадку контрольних точок, якщо подія викликається, вебхук відписується після цього, тим самим вирішуючи граничний випадок.

Ось реалізація цього інтерфейсу з додатку Phrase TMS:

```cs
public class ProjectStatusChangedHandler(
    InvocationContext invocationContext,
    [WebhookParameter] ProjectStatusChangedRequest projectStatusChangedRequest,
    [WebhookParameter] ProjectOptionalRequest projectOptionalRequest)
    : BaseWebhookHandler(invocationContext, SubscriptionEvent), IAfterSubscriptionWebhookEventHandler<ProjectDto>
{
    const string SubscriptionEvent = "PROJECT_STATUS_CHANGED";

    public async Task<AfterSubscriptionEventResponse<ProjectDto>> OnWebhookSubscribedAsync()
    {
        if (projectOptionalRequest.ProjectUId != null && projectStatusChangedRequest.Status != null)
        {
            var client = new PhraseTmsClient(InvocationContext.AuthenticationCredentialsProviders);
            var request = new PhraseTmsRequest($"/api2/v1/projects/{projectOptionalRequest.ProjectUId}", Method.Get,
                InvocationContext.AuthenticationCredentialsProviders);
            var project = await client.ExecuteWithHandling<ProjectDto>(request);
            
            if(project.Status == projectStatusChangedRequest.Status)
            {
                return new AfterSubscriptionEventResponse<ProjectDto>()
                {
                    Result = project
                };
            }
        }

        return null;
    }
}
``` 
> **💡 Примітка**: ця подія буде запущена при підписці, тільки якщо виконані ТОЧНІ умови: було вказано конкретний ID проєкту і статус цього проєкту точно відповідає вказаному статусу.

## Додаткові вхідні параметри вебхуків

Ви можете використовувати атрибут `[WebhookParameter]`, щоб додати (необов'язкові) вхідні значення до вашої події вебхука. Наприклад, якщо ви хочете дозволити користувачу більш точно визначити подію.

Ці вхідні параметри можуть використовуватися або не використовуватися в методі підписки. Це може статися, якщо ваша кінцева точка або тіло запиту підписки приймає певні додаткові параметри для введення. Якщо вхідний параметр фактично використовується для створення підписки, ми рекомендуємо використовувати `[WebhookParameter(true)]`. Це необов'язкове логічне значення вказує Blackbird, що опис залежить від цього введення. Якщо це вхідне значення змінюється, робочий процес автоматично переоформить підписку.

```cs
[Webhook("On issue status changed", typeof(IssueUpdatedHandler), 
    Description = "This webhook is triggered when issue status is changed.")]
public async Task<WebhookResponse<IssueResponse>> OnIssueStatusChanged(WebhookRequest request,
    [WebhookParameter] ProjectIdentifier project, [WebhookParameter] OptionalStatusInput status, [WebhookParameter] IssueInput issue)
{
    var payload = DeserializePayload(request);
    var statusItem = payload.Changelog.Items.FirstOrDefault(item => item.FieldId == "status");

    if (statusItem is null 
        || (project.ProjectKey is not null && !project.ProjectKey.Equals(payload.Issue.Fields.Project.Key))
        || (status.StatusId is not null && payload.Issue.Fields.Status.Id != status.StatusId)
        || (issue.IssueKey is not null && !issue.IssueKey.Equals(payload.Issue.Key)))
        return new WebhookResponse<IssueResponse>
        {
            HttpResponseMessage = new HttpResponseMessage(HttpStatusCode.OK),
            ReceivedWebhookRequestType = WebhookRequestType.Preflight
        };

    var issueResponse = CreateIssueResponse(payload);
    return issueResponse;
}
```

## Зворотні виклики

Blackbird також може обробляти додатки, які працюють із зворотними викликами замість вебхуків. Зазвичай ці URL-адреси мають бути налаштовані вручну. Реалізація цього досить проста і працює точно так само, як вебхуки. Єдина відмінність полягає в тому, що якщо ви не визначаєте `IWebhookEventHandler` в атрибуті вебхука, Blackbird буде вважати це зворотним викликом. У цьому випадку Blackbird надасть користувачу URL-адресу в інтерфейсі, коли вони опублікують свій робочий процес.

Наступний метод не має обробника вебхука (порівняйте це з вебхуками, визначеними вище!)

```cs
[Webhook("On callback received", Description = "On callback received")]
public Task<WebhookResponse<CallbackPayload>> OnCallbackReceived(WebhookRequest webhookRequest)
    => HandlerWebhook<CallbackPayload>(webhookRequest);
```

Це перекладається в:

![callback](../../../../assets/docs/callback.png)

> Порада: можна використовувати функціонал зворотного виклику для створення "викликаних" робочих процесів, ніби у Blackbird був свій власний API.

> **💡 Примітка**: Якщо ви створюєте різні робочі процеси з однаковою подією та однаковим з'єднанням, то всі ці робочі процеси матимуть однакову URL-адресу. Blackbird має припущення, що це все ще та сама подія, яка запускається, і це дозволяє нам оптимізувати внутрішньо.

> **💡 Примітка**: Якщо ви призупиняєте робочий процес або змінюєте подію та перепублікуєте робочий процес, URL-адреса зміниться і її потрібно буде перенастроювати там, де URL-адреса застосовується.

Оскільки зворотні виклики вимагають досить багато навичок розробника для використання, **ми рекомендуємо використовувати опитування замість зворотних викликів, коли ви розробляєте додатки