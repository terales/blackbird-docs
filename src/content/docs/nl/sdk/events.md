---
locale: nl
title: Gebeurtenissen definiëren
description: Leer hoe je webhook- en callback-gebeurtenissen definieert in een Blackbird project.
sidebar:
  label: Events
  order: 5
---

Triggers zijn een belangrijk onderdeel van elke workflow-orchestrator. Blackbird maakt het mogelijk om aangepaste gebeurtenissen te definiëren als triggers. Deze gebeurtenissen komen meestal overeen met webhooks in applicaties, maar ze kunnen ook callback-URL's zijn of werken via polling.

## Webhooks

Net zoals bij acties gebruiken we het `WebhookList` attribuut om Blackbird naar onze webhooks te verwijzen. Je kunt je webhooks opsplitsen in meerdere bestanden door meerdere klassen aan te maken die `WebhookList` implementeren. Het `Webhook` attribuut moet aan elke webhook-verwerkingsmethode worden toegevoegd. Net als bij acties krijgen ze ook een naam en beschrijving.

```cs
[WebhookList]
public class WebhookList : BaseInvocable
{

  // Net zoals bij artikelen kunnen we de weergavenaam en de beschrijving definiëren.
  [Webhook("On article published", typeof(ArticlePublishedHandler), Description = "On article published")]
  public async Task<WebhookResponse<ArticlePublishedResponse>> ArticlePublishedHandler(WebhookRequest webhookRequest,
    [WebhookParameter][Display("New status")][DataSource(typeof(ItemStatusDataHandler))] string? newStatus) // We kunnen ook een (optionele, dynamische) parameter aan webhooks geven
  {
    // Webhook-verwerkingsmethoden beginnen meestal met het deserialiseren van de WebhookRequest
    var data = JsonConvert.DeserializeObject<ArticlePayloadTemplate<PublishEvent>>(webhookRequest.Body.ToString());
    if (data is null) { throw new InvalidCastException(nameof(webhookRequest.Body)); }

    // Geef een instantie van WebhookResponse terug
    return new WebhookResponse<ArticlePublishedResponse>
    {
      HttpResponseMessage = null,
      ReceivedWebhookRequestType = WebhookRequestType.Default,
      Result = new ArticlePublishedResponse
      {
        // Implementeer
      }
    };
  }
}
```

Sommige externe systemen kunnen aanvullende gegevens vragen, bijvoorbeeld inloggegevens, URL om de gebeurtenislading te verzenden, enz., voordat ze de gebeurtenislading verzenden. Daarom geven we je de mogelijkheid om de respons naar het systeem te beheren en of er een flight moet worden gestart met specifieke inloggegevens.

Het Blackbird platform draagt alle aanvraagparameters over naar het `WebhookRequest` object. Dit omvat de HTTP-methode, aanvullende headers, enz. Je kunt dit gebruiken om te beslissen hoe je deze aanvraag wilt afhandelen.

In de `WebhookResponse` klasse die je teruggeeft, kun je aan Blackbird aangeven of deze binnenkomende aanvraag een bird moet activeren of niet. Als je geen bird wilt activeren, stel je `ReceivedWebhookRequestType` in op `WebhookRequestType.Preflight`.

Je kunt ook bepalen welk bericht terug wordt gestuurd naar de aanroepende service door een `HttpResponseMessage` te leveren. Als `null` wordt opgegeven, stuurt Blackbird standaard een `204 no content` respons.

Alle eigenschappen die aan de `Result` klasse-implementatie worden doorgegeven, zijn beschikbaar in de bird editor. Alle `Display` attributen zijn hier ook mogelijk.

> **💡 Opmerking**: De naam van je webhook-methode kan niet worden gewijzigd, Blackbird zou het interpreteren als een verwijderde en nieuw aangemaakte gebeurtenis.

### Automatisch abonneren en opzeggen

Om automatisch abonneren en opzeggen van webhooks te definiëren, kun je een instantie van `IWebhookEventHandler` implementeren en deze aan de webhook koppelen als het tweede argument (zie het voorbeeld hierboven `typeof(ArticlePublishedHandler)`).

De webhook event handler heeft twee methoden: `SubscribeAsync` en `UnsubscribeAsync`. Deze worden geactiveerd wanneer een bird respectievelijk wordt gepubliceerd en niet-gepubliceerd/verwijderd. Beide moeten de API-aanroepen implementeren die de webhooks maken/verwijderen.

Een voorbeeldimplementatie uit de Zendesk-app wordt hieronder getoond:

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
        // De values["payloadUrl"] bevat de URL die de andere applicatie kan aanroepen wanneer de gebeurtenis plaatsvindt
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
    // Voor Zendesk moeten we eerst de ID van de webhook ophalen die we hebben gemaakt
    var getRequest = new ZendeskRequest($"/api/v2/webhooks?filter[name_contains]={SubscriptionEvent}", Method.Get, Creds);
    var webhooks = await Client.GetAsync<WebhooksListResponse>(getRequest);
    var webhookId = webhooks.Webhooks.First().Id;

    // Dan verwijderen we de webhook
    var deleteRequest = new ZendeskRequest($"/api/v2/webhooks/{webhookId}", Method.Delete, Creds);
    await Client.ExecuteAsync(deleteRequest);
  }
}
```

> **💡 Tip**: je kunt de Bird ID uit de invocation context gebruiken om unieke sleutels te genereren voor elke abonnement indien nodig.

### Omgaan met randgevallen bij checkpoints

Gebeurtenissen kunnen aan het begin van de bird worden gemaakt om als trigger te fungeren. Ze kunnen echter ook worden gebruikt in het midden van een bird als checkpoint. Een veelvoorkomend scenario voor een checkpoint zou zijn om _te wachten tot een status wordt gewijzigd naar X_. Daarin ligt een probleem: wat als de status al was gewijzigd naar _X_ voordat het abonnement op de webhook was gemaakt?

Om met dit randgeval om te gaan, staan we ook toe dat je `IAfterSubscriptionWebhookEventHandler<T>` implementeert op een Webhook handler klasse. Deze interface vraagt om de `OnWebhookSubscribedAsync` methode te implementeren. Deze methode wordt aangeroepen op het moment dat het abonnement wordt gemaakt. Je kunt deze methode gebruiken om de eerste gebeurtenis onmiddellijk te activeren. In het geval van checkpoints, als de gebeurtenis wordt aangeroepen, zal de webhook zich daarna afmelden, waardoor het randgeval wordt opgelost.

Hier is de implementatie van deze interface uit de Phrase TMS-app:

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
> **💡 Opmerking**: deze gebeurtenis wordt alleen geactiveerd bij abonnement als aan de EXACTE voorwaarden wordt voldaan: er is een specifieke project-ID opgegeven en de status van dat project is exact die van de opgegeven status.

## Aanvullende webhook-inputs

Je kunt het `[WebhookParameter]` attribuut gebruiken om (optionele) invoerwaarden toe te voegen aan je webhook-gebeurtenis. Bijvoorbeeld als je je gebruiker de mogelijkheid wilt geven om hun gebeurtenis nauwkeuriger te specificeren.

Deze invoerparameters kunnen wel of niet worden gebruikt in de daadwerkelijke abonnementsmethode. Dit kan gebeuren als je endpoint of de body van het abonnementsverzoek bepaalde extra parameters voor de invoer nodig heeft. Als een invoerparameter daadwerkelijk wordt gebruikt om het abonnement te maken, raden we aan om `[WebhookParameter(true)]` te gebruiken. Deze optionele booleaanse waarde vertelt Blackbird dat de beschrijving afhankelijk is van deze invoer. Als deze invoerwaarde nu wordt gewijzigd, zal de bird automatisch opnieuw abonneren.

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

## Callbacks

Blackbird kan ook applicaties afhandelen die werken met callbacks in plaats van webhooks. Meestal moeten deze URL's handmatig worden geconfigureerd. De implementatie hiervan is vrij eenvoudig en werkt precies hetzelfde als webhooks. Het enige verschil is dat als je geen `IWebhookEventHandler` definieert in het webhook-attribuut, Blackbird het als een callback zal beschouwen. In dit geval zal Blackbird de gebruiker een URL in de UI geven wanneer ze hun bird publiceren.

De volgende methode heeft geen webhook handler (vergelijk dit met de hierboven gedefinieerde webhooks!)

```cs
[Webhook("On callback received", Description = "On callback received")]
public Task<WebhookResponse<CallbackPayload>> OnCallbackReceived(WebhookRequest webhookRequest)
    => HandlerWebhook<CallbackPayload>(webhookRequest);
```

Dit vertaalt zich naar:

![callback](~/assets/docs/callback.png)

> Tip: men kan de callback-functionaliteit gebruiken om "aanroepbare" birds te maken alsof Blackbird zijn eigen API had.

> **💡 Opmerking**: Als je verschillende birds maakt met dezelfde gebeurtenis en dezelfde verbinding, dan hebben al deze birds dezelfde URL. Blackbird gaat ervan uit dat het nog steeds dezelfde gebeurtenis is die wordt geactiveerd en dit stelt ons in staat om intern te optimaliseren.

> **💡 Opmerking**: Als je een bird opschort, of als je de gebeurtenis wijzigt en de bird opnieuw publiceert, zal de URL veranderen en moet deze opnieuw worden geconfigureerd waar de URL wordt toegepast.

Omdat callbacks behoorlijk wat ontwikkelaarsvaardigheden vereisen, **raden we aan om polling te gebruiken in plaats van callbacks wanneer je apps ontwikkelt die bedoeld zijn voor een breed publiek**.

## Polling

Naast webhooks en callbacks kan de kern van Blackbird ook verschillende polling-scenario's afhandelen. In plaats van een `WebhookList` met `Webhook` geattribueerde methoden te implementeren, kun je een `PollingEventList` implementeren met `PollingEvent` geattribueerde methoden.

```cs
[PollingEvent("On polled event", "This is triggered periodically, depending on the user's prefered input.")]
public async Task<PollingEventResponse<Memory, PollingResponse>> MyPollingEvent(PollingEventRequest<Memory> request, 
    [PollingEventParameter][Display("Some extra input")] string input)
{
  // [... implementatie]
}
```

Een polling-gebeurtenis neemt altijd een `PollingEventRequest<T>` als eerste parameter (waarbij `T` een geheugenimplementatie is). Het kan worden gevolgd door een willekeurig aantal `PollingEventParameter` geattribueerde argumenten die vergelijkbaar werken met acties en webhooks. Het retourtype van deze methode moet altijd van het type `PollingEventResponse<T, U>` zijn, waarbij `T` de geheugenimplementatie is en `U` de respons die als uitvoer van de gebeurtenis in de bird wordt verzonden.

Een mogelijke implementatie van `PollingEventResponse<T, U>` kan er als volgt uitzien:

```cs
  return new()
  {
      FlyBird = newBerries.Count() > 0, // als FlyBird op true is gezet, zal de polling een gebeurtenis activeren (er wordt een flight gemaakt of een checkpoint wordt gepasseerd)
      Memory = new()
      {
          AllBerries = response.Results // Update het geheugen
      },
      Result = new()
      {
          NewBerries = newBerries, // De inhoud die naar de gebeurtenis wordt gestuurd wanneer deze in de bird wordt geactiveerd
      }
  };
```

Wanneer een polling-gebeurtenis wordt 'geactiveerd' (door het publiceren van een bird of wanneer een flight bij een polling-checkpoint aankomt), wordt de polling-eventmethode aangeroepen. Als het geretourneerde object aangeeft dat de gebeurtenis