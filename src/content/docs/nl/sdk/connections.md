---
locale: nl
title: Verbindingen definiëren
description: Leer hoe je definieert hoe Blackbird met de verbindingen van je app moet omgaan.
sidebar:
  label: Verbindingen
  order: 3
---

> Alle codefragmenten op deze pagina kunnen ook worden bekeken in de [Template app](https://github.com/bb-io/TemplateApp).

Wanneer een gebruiker een verbinding met jouw applicatie wil maken, krijgt hij een prompt te zien. In deze prompt kunnen variabele invoervelden worden getoond die overeenkomen met de waarden die je moet opslaan om een verbinding tot stand te brengen. Als alternatief kun je Blackbird vertellen om in plaats daarvan OAuth te gebruiken. In dit artikel leggen we uit hoe je de interface `IConnectionDefinition`, de interface `IConnectionValidator` implementeert, en hoe je verbindingen in de rest van je code kunt gebruiken.

> Alle inloggegevens worden veilig opgeslagen in een sleutelbewaarplaats in Blackbird, wat betekent dat alle inloggegevens worden opgeslagen als sleutel/waarde-paren.

## Verbindingseigenschappen

`IConnectionDefinition` wordt gebruikt om de definities op te slaan van alle verschillende velden die door de gebruiker kunnen worden gedefinieerd in de verbindingsinterface. De eigenschap `ConnectionPropertyGroups` moet een lijst van `ConnectionPropertyGroups` implementeren. Door inloggegevens in verschillende groepen te scheiden, kun je verschillende authenticatiemethoden voor een enkele app specificeren, als deze verschillende authenticatiemethoden gebruikt voor acties en webhooks.

In zijn meest eenvoudige vorm heeft één groep een lijst van `ConnectionProperty`. De namen van deze eigenschappen verschijnen in de Blackbird UI wanneer een nieuwe verbinding wordt gemaakt. Je kunt ook de eigenschap `DisplayName` gebruiken om een aangepaste weergave van deze invoer te definiëren. Je kunt ook de eigenschap `Sensitive` gebruiken om wachtwoordinvoer te definiëren.

```cs
public IEnumerable<ConnectionPropertyGroup> ConnectionPropertyGroups => new List<ConnectionPropertyGroup>
{
    // API token auth example
    new()
    {
        Name = "Developer API token",
        AuthenticationType = ConnectionAuthenticationType.Undefined,

        // Specifying properties that we will need for authorization of the app
        ConnectionProperties = new List<ConnectionProperty>
        {
            new(CredsNames.ApiToken)
            {
                // Property user-friendly name that will be displayed on the UI
                DisplayName = "API token",

                // Setting this flag to true hides token input, replacing each its character with •
                Sensitive = true,
                // Description of the connection property,
                // perhaps with some guidelines on how to find it in the service
                Description = "You can create API token in your profile settings, on the API tab"
            }
        }
    }
};
```

Je verbindingseigenschap kan ook een dropdown-lijst van eindige waarden zijn. Gebruik hiervoor de eigenschap `DataItems`:

```cs
    new(CredsNames.Environment)
    {
        DisplayName = "Environment",
        Description = "Whether to use staging or production",
        DataItems = 
        [
            new (Urls.ProductionApi, "Production"),
            new (Urls.StagingApi, "Staging")
        ]
    }
```

Dit zal de dropdown weergeven:

![dropdown](~/assets/docs/dropdown.png)

## Verbindingseigenschappen omzetten in inloggegevens

Onthoud dat we alle verbindingseigenschappen opslaan als sleutel/waarde-paren in een beveiligde kluis? De methode `CreateAuthorizationCredentialProviders` converteert de lijst met opgeslagen sleutel/waarde-paren naar een toegankelijke lijst met inloggegevens die wordt doorgegeven aan acties en webhooks. Met deze methode kun je hier meer informatie specificeren, afhankelijk van je implementatie. In zijn meest eenvoudige vorm converteert deze methode simpelweg sleutel/waarde-paren naar `AuthenticationCredentialsProvider`.

```cs
public IEnumerable<AuthenticationCredentialsProvider> CreateAuthorizationCredentialsProviders(
    Dictionary<string, string> values)
{
    // Processing API key credentials
    var apiKey = values.First(v => v.Key == CredsNames.ApiToken);
    yield return new AuthenticationCredentialsProvider(
        apiKey.Key,
        apiKey.Value
    );
}
```

Als je geen transformaties hoeft uit te voeren, kun je eenvoudig deze verkorte vorm implementeren:

```cs
public IEnumerable<AuthenticationCredentialsProvider> CreateAuthorizationCredentialsProviders(
    Dictionary<string, string> values) => values.Select(x => new AuthenticationCredentialsProvider(x.Key, x.Value)).ToList();
```

## OAuth-verbindingen

Om aan te geven dat OAuth2 moet worden gebruikt in het verbindingsscherm, gebruik je `ConnectionAuthenticationType.OAuth2` als het verbindingstype. In dit geval kun je nog steeds extra verbindingseigenschappen toevoegen als je die nodig hebt.

Wanneer OAuth2 wordt gebruikt, ontvangt de methode `CreateAuthorizationCredentialsProviders` ook een extra sleutel/waarde-paar met de naam _access_token_. Dit kan dan worden omgezet in een `AuthenticationCredentialsProvider`.

```cs
public class ConnectionDefinition : IConnectionDefinition
{
    public IEnumerable<ConnectionPropertyGroup> ConnectionPropertyGroups => new List<ConnectionPropertyGroup>
    {
        // OAuth example
         new()
         {
             Name = "OAuth2",
             AuthenticationType = ConnectionAuthenticationType.OAuth2,
             ConnectionProperties = new List<ConnectionProperty>()
         },
    };

    public IEnumerable<AuthenticationCredentialsProvider> CreateAuthorizationCredentialsProviders(
        Dictionary<string, string> values)
    {
        // Processing OAuth credentials
        var accessToken = values.First(v => v.Key == CredsNames.AccessToken);
        yield return new AuthenticationCredentialsProvider(
            "Authorization",
            $"Bearer {accessToken.Value}"
        );
    }
}
```

### OAuth2-flows definiëren

Blackbird kan apps ondersteunen die OAuth2-verbindingen vereisen. Momenteel ondersteunt Blackbird de volgende standaard flows:

- Authorization code (Sectie 1.3.1 van [RFC](https://www.ietf.org/rfc/rfc6749.txt))
- Implicit grant (Sectie 1.3.2 van [RFC](https://www.ietf.org/rfc/rfc6749.txt))

Om te beginnen, implementeer interfaces voor `IOAuth2AuthorizeService` en `IOAuth2TokenService`.

Voeg dan verwijzingen naar deze interfaces toe in je `IApplication`.

Wanneer de OAuth2-flow wordt gestart, roept Blackbird instanties van de `IOAuth2AuthorizeService` en `IOAuth2TokenService` aan met behulp van de methode `GetInstance<T>` van de interface `IApplication`. Je moet logica implementeren om instanties van deze interfaces terug te geven.

Laten we een eenvoudig implementatievoorbeeld bekijken:

```cs
public class SampleApplication : IApplication
{
  private readonly Dictionary<Type, object> _container;

  public SampleApplication()
  {
    _container = LoadTypes();
  }

  public T GetInsance<T>()
  {
    return _container[typeof(T)] as T;
  }

  private Dictionary<Type, object> LoadTypes()
  {
    new Dictionary<Type, object>
    {
      new { IOAuth2AuthorizeService, new OAuth2AuthorizeService() },
      new { IOAuth2TokenService, new OAuth2TokenService() }
    }
  }
}
```

De `IOAuth2AuthorizeService` genereert de authenticatie-URL op basis van de verbinding en enkele door Blackbird geïnjecteerde waarden. Het volgende voorbeeld gebruikt de implicit grant flow.

```cs
public class OAuth2AuthorizeService : BaseInvocable, IOAuth2AuthorizeService
{
    public OAuth2AuthorizeService(InvocationContext invocationContext) : base(invocationContext)
    {
    }

    public string GetAuthorizationUrl(Dictionary<string, string> values)
    {
        var parameters = new Dictionary<string, string>
        {
            { "client_id",  ApplicationConstants.ClientId},
            { "redirect_uri", InvocationContext.UriInfo.ImplicitGrantRedirectUri.ToString()},
            { "scope", ApplicationConstants.Scope },
            { "state", values["state"] }
        };

        // Creating url with query parameters
        return Urls.Authorize.WithQuery(parameters);
    }
}
```

De interface `IOAuth2TokenService` definieert hoe de redirect terug naar Blackbird moet worden geïnterpreteerd en hoe de gegeven tokens moeten worden opgeslagen/verwerkt. De tokens die als een dictionary aan Blackbird worden doorgegeven nadat de methode `RequestToken` is aangeroepen, worden opgeslagen in de sleutel/waarde-kluis. Later kunnen ze worden gebruikt door de methode `CreateAuthorizationCredentialProviders`. De `IOAuth2TokenService` implementeert de volgende acties:

- `IsRefreshToken` moet true retourneren als de huidige token die is opgeslagen in de sleutel/waarde-kluis moet worden vernieuwd.
- `RequestToken` krijgt de state, code en andere waarden die aan de redirect-URL worden doorgegeven wanneer een gebruiker zijn OAuth-verbinding maakt. Gebruik het om de juiste token op te halen. De geretourneerde dictionary wordt opgeslagen in de sleutel/waarde-kluis.
- `RefreshToken` wordt aangeroepen wanneer `IsRefreshToken` true is.
- `RevokeToken` wordt aangeroepen wanneer de gebruiker zijn verbinding verwijdert.

Het volledige voorbeeld is [hier](https://github.com/bb-io/TemplateApp/blob/master/TemplateApp/Connections/OAuth/OAuth2TokenService.cs) te vinden.

## Verbindingen valideren

We willen valideren dat de verstrekte inloggegevens inderdaad correct zijn en directe feedback geven aan de gebruiker in de Blackbird UI. Het valideren van de verbinding is de verantwoordelijkheid van de interface `IConnectionValidator`. De methode `ValidateConnection` moet een object retourneren dat aangeeft of de verbinding geldig is en optioneel de foutmelding die wordt weergegeven.

```cs
public class ConnectionValidator : IConnectionValidator
{
    private static readonly AppRestClient Client = new();

    public async ValueTask<ConnectionValidationResponse> ValidateConnection(
        IEnumerable<AuthenticationCredentialsProvider> authProviders, CancellationToken cancellationToken)
    {
        var request = new AppRestRequest(ApiEndpoints.Berry, Method.Get, authProviders);

        try
        {
            await Client.ExecuteWithHandling<ListResponse<Berry>>(request);

            // If ExecuteWithHandling did not throw an exception
            // then request was successful and credentials are valid
            return new()
            {
                IsValid = true
            };
        }
        catch (Exception ex)
        {
            // If Exception was thrown, we mark connection credentials as invalid
            // and pass the exception message in the response
            return new()
            {
                IsValid = false,
                Message = ex.Message
            };
        }
    }
}
```

Na dit alles ingesteld te hebben, kan Blackbird nu het verbindingsformulier aan de gebruiker tonen.

![connection](~/assets/docs/connection_modal.png)

## Toegang tot inloggegevens in acties en gebeurtenissen

Zoals eerder vermeld, heb je toegang tot de inloggegevens die zijn opgeslagen in de sleutel/waarde-kluis in je acties en gebeurtenissen. De inloggegevens worden gegeven aan het object `InvocationContext` dat wordt geïnjecteerd in elke klasse die overerft van `BaseInocable`, samen met andere contextvariabelen. Gebruik de eigenschap `InvocationContext.AuthenticationCredentialsProviders` om de sleutel/waarde-paren op te halen zoals ze worden geretourneerd door de methode `CreateAuthorizationCredentialsProviders` in `ConnectionDefinition`.