---
locale: hu
title: Események definiálása
description: Tanulja meg a webhook és callback események definiálását egy Blackbird projektben.
sidebar:
  label: Események
  order: 5
---

Az indítók fontos részét képezik minden munkafolyamat-vezérlőnek. A Blackbird lehetővé teszi egyéni események definiálását indítókként. Ezek az események általában alkalmazások webhookjainak felelnek meg, de lehetnek callback URL-ek is, vagy működhetnek lekérdezéssel.

## Webhookok

Ahogy az akciók esetében is, a `WebhookList` attribútumot használjuk, hogy a Blackbird-et a webhookjaink felé irányítsuk. Több fájlra is feloszthatja a webhookjait több olyan osztály biztosításával, amelyek implementálják a `WebhookList` interfészt. A `Webhook` attribútumot minden webhook kezelő metódushoz hozzá kell adni. Az akciókhoz hasonlóan ezek is nevet és leírást kapnak.

```cs
[WebhookList]
public class WebhookList : BaseInvocable
{

  // Ahogy a cikkeknél is, definiálhatjuk a megjelenítendő nevet és a leírást.
  [Webhook("On article published", typeof(ArticlePublishedHandler), Description = "On article published")]
  public async Task<WebhookResponse<ArticlePublishedResponse>> ArticlePublishedHandler(WebhookRequest webhookRequest,
    [WebhookParameter][Display("New status")][DataSource(typeof(ItemStatusDataHandler))] string? newStatus) // A webhookoknak is adhatunk (opcionális, dinamikus) paramétereket
  {
    // A webhook kezelő metódusok általában a WebhookRequest deszerializálásával kezdődnek
    var data = JsonConvert.DeserializeObject<ArticlePayloadTemplate<PublishEvent>>(webhookRequest.Body.ToString());
    if (data is null) { throw new InvalidCastException(nameof(webhookRequest.Body)); }

    // Visszaadunk egy WebhookResponse példányt
    return new WebhookResponse<ArticlePublishedResponse>
    {
      HttpResponseMessage = null,
      ReceivedWebhookRequestType = WebhookRequestType.Default,
      Result = new ArticlePublishedResponse
      {
        // Implementálás
      }
    };
  }
}
```

Egyes külső rendszerek további adatokat kérhetnek, például hitelesítési adatokat, URL-t az esemény adatainak küldéséhez stb., mielőtt elküldik az esemény adatait. Ezért lehetővé tesszük a rendszernek küldött válasz szabályozását, valamint azt, hogy egy repülést specifikus hitelesítési adatokkal kell-e indítani.

A Blackbird platform minden kérési paramétert átad a `WebhookRequest` objektumnak. Ez magában foglalja a HTTP metódust, további fejléceket stb. Ezeket felhasználhatja a kérés kezelésének meghatározásához.

A visszaadott `WebhookResponse` osztályban jelezni tudja a Blackbird felé, hogy ez a bejövő kérés indítson-e egy madarat vagy sem. Ha nem szeretné, hogy madár induljon, állítsa a `ReceivedWebhookRequestType` értékét `WebhookRequestType.Preflight`-ra.

Azt is szabályozhatja, hogy milyen üzenet kerül visszaküldésre a hívó szolgáltatásnak a `HttpResponseMessage` megadásával. Ha `null` értéket ad meg, akkor a Blackbird alapértelmezés szerint egy `204 no content` választ küld.

A `Result` osztály implementációjának átadott összes tulajdonság elérhető lesz a madár szerkesztőben. Itt is lehetséges az összes `Display` attribútum.

> **💡 Megjegyzés**: A webhook metódus neve nem változtatható meg, a Blackbird törölt és újonnan létrehozott eseményként értelmezné.

### Automatikus feliratkozás és leiratkozás

Webhookokra való automatikus feliratkozás és leiratkozás definiálásához implementálhat egy `IWebhookEventHandler` példányt, és csatolhatja azt a webhookhoz második argumentumként (lásd a fenti példát `typeof(ArticlePublishedHandler)`).

A webhook eseménykezelőnek két metódusa van: `SubscribeAsync` és `UnsubscribeAsync`. Ezek akkor aktiválódnak, amikor egy madár közzé van téve, illetve amikor visszavonják/törlik. Mindkettőnek implementálnia kell azokat az API-hívásokat, amelyek létrehozzák/törlik a webhookokat.

Az alábbi példa a Zendesk alkalmazásból származik:

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
        // A values["payloadUrl"] tartalmazza azt az URL-t, amelyet a másik alkalmazás meghívhat, amikor az esemény bekövetkezik
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
    // A Zendesk esetében először le kell kérnünk az általunk létrehozott webhook azonosítóját
    var getRequest = new ZendeskRequest($"/api/v2/webhooks?filter[name_contains]={SubscriptionEvent}", Method.Get, Creds);
    var webhooks = await Client.GetAsync<WebhooksListResponse>(getRequest);
    var webhookId = webhooks.Webhooks.First().Id;

    // Ezután töröljük a webhookot
    var deleteRequest = new ZendeskRequest($"/api/v2/webhooks/{webhookId}", Method.Delete, Creds);
    await Client.ExecuteAsync(deleteRequest);
  }
}
```

> **💡 Tipp**: az invocation context Bird ID-jét használhatja egyedi kulcsok generálására minden feliratkozáshoz, ha szükséges.

### Ellenőrzőpontok kezelése szélsőséges esetekben

Az események létrehozhatók a madár tetején, hogy indítóként működjenek. Azonban használhatók a madár közepén is, ellenőrzőpontként. Az ellenőrzőpont egy gyakori forgatókönyve lehet a _várjunk, amíg az állapot X-re változik_. Itt rejlik egy probléma: mi van akkor, ha az állapotot már _X_-re változtatták, mielőtt a webhook előfizetését létrehozták volna?

Ennek a szélsőséges esetnek a kezelése érdekében lehetővé tesszük az `IAfterSubscriptionWebhookEventHandler<T>` implementálását egy Webhook kezelő osztályban. Ez az interfész az `OnWebhookSubscribedAsync` metódus implementálását kívánja. Ez a metódus a feliratkozás pillanatában hívódik meg. Felhasználhatja ezt a metódust, hogy azonnal kiváltsa az első eseményt. Az ellenőrzőpontok esetében, ha az eseményt meghívják, a webhook ezután leiratkozik, így megoldva a szélsőséges esetet.

Íme az interfész implementációja a Phrase TMS alkalmazásból:

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
> **💡 Megjegyzés**: ez az esemény csak akkor aktiválódik feliratkozáskor, ha a PONTOS feltételek teljesülnek: egy konkrét projekt azonosítót adtak meg, és a projekt állapota pontosan megegyezik a megadott állapottal.

## További webhook bemenetek

A `[WebhookParameter]` attribútummal (opcionális) beviteli értékeket adhat a webhook eseményhez. Például ha lehetővé szeretné tenni a felhasználó számára, hogy pontosabban határozza meg az eseményét. 

Ezeket a bemeneti paramétereket lehet, hogy nem használják a tényleges feliratkozási metódusban. Ez akkor fordulhat elő, ha a végpont vagy a feliratkozási kérés törzse bizonyos extra paramétereket vár a bemenethez. Ha egy bemeneti paramétert ténylegesen a feliratkozás létrehozására használnak, javasoljuk, hogy használja a `[WebhookParameter(true)]` formát. Ez az opcionális logikai érték jelzi a Blackbird számára, hogy a leírás függ ettől a bemenettől. Ha ezt a bemeneti értéket most megváltoztatják, a madár automatikusan újrairatkozik.

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

## Callbackek

A Blackbird kezelni tud olyan alkalmazásokat is, amelyek webhookok helyett callbackekkel működnek. Tipikusan ezeket az URL-eket manuálisan kell konfigurálni. Ennek implementálása meglehetősen egyszerű, és pontosan ugyanúgy működik, mint a webhookok. Az egyetlen különbség az, hogy ha nem definiál `IWebhookEventHandler`-t a webhook attribútumban, a Blackbird callbacknek tekinti azt. Ebben az esetben a Blackbird a felhasználó számára egy URL-t biztosít a felhasználói felületen, amikor közzéteszi a madarát.

A következő metódusnak nincs webhook kezelője (hasonlítsa össze a fent definiált webhookkal!)

```cs
[Webhook("On callback received", Description = "On callback received")]
public Task<WebhookResponse<CallbackPayload>> OnCallbackReceived(WebhookRequest webhookRequest)
    => HandlerWebhook<CallbackPayload>(webhookRequest);
```

Ez a következőképpen jelenik meg:

![callback](~/assets/docs/callback.png)

> Tipp: a callback funkcionalitás használható "hívható" madarak létrehozására, mintha a Blackbird saját API-val rendelkezne.

> **💡 Megjegyzés**: Ha különböző madarakat hoz létre ugyanazzal az eseménnyel és ugyanazzal a kapcsolattal, akkor mindezen madarak ugyanazt az URL-t fogják használni. A Blackbird feltételezi, hogy továbbra is ugyanaz az esemény aktiválódik, és ez lehetővé teszi számunkra a belső optimalizálást.

> **💡 Megjegyzés**: Ha felfüggeszti a madarat, vagy ha megváltoztatja az eseményt és újra közzéteszi a madarat, az URL meg fog változni, és újra konfigurálni kell ott, ahol az URL-t alkalmazzák.

Mivel a callbackek használata jelentős fejlesztői készségeket igényel, **azt javasoljuk, hogy a lekérdezést használja a callbackek helyett, amikor olyan alkalmazásokat fejleszt, amelyeket széles közönségnek szán**.

## Lekérdezés

A webhookok és callbackek mellett a Blackbird magja különböző lekérdezési forgatókönyveket is kezelni tud. Ahelyett, hogy egy `WebhookList`-et implementálna `Webhook` attribútummal ellátott metódusokkal, implementálhat egy `PollingEventList`-et `PollingEvent` attribútummal ellátott metódusokkal.

```cs
[PollingEvent("On polled event", "This is triggered periodically, depending on the user's prefered input.")]
public async Task<PollingEventResponse<Memory, PollingResponse>> MyPollingEvent(PollingEventRequest<Memory> request, 