---
locale: hu
title: Kapcsolatok Definiálása
description: Ismerje meg, hogyan definiálja, hogy a Blackbird hogyan kezelje az alkalmazás kapcsolatait.
sidebar:
  label: Kapcsolatok
  order: 3
---

> Ezen az oldalon található összes kódrészlet megtekinthető a [Template app](https://github.com/bb-io/TemplateApp) oldalon is.

Amikor egy felhasználó kapcsolatot szeretne létrehozni az alkalmazásával, egy felkérést kap. Ebben a felkérésben változó beviteli mezők adhatók meg, amelyek megfelelnek azoknak az értékeknek, amelyeket el kell mentenie a kapcsolat létrehozásához. Alternatív megoldásként utasíthatja a Blackbird-et, hogy használjon OAuth-t helyette. Ebben a cikkben elmagyarázzuk, hogyan kell implementálni az `IConnectionDefinition` interfészt, az `IConnectionValidator` interfészt, és hogyan kell használni a kapcsolatokat a kódja többi részében.

> Minden hitelesítő adat biztonságosan tárolódik a Blackbird kulcstárában, ami azt jelenti, hogy minden hitelesítő adat kulcs/érték párként van tárolva.

## Kapcsolat tulajdonságok

Az `IConnectionDefinition` segítségével tárolhatók az összes különböző mező definíciói, amelyeket a felhasználó a kapcsolati felületen meghatározhat. A `ConnectionPropertyGroups` tulajdonságnak egy `ConnectionPropertyGroups` listát kell megvalósítania. A különböző csoportokba rendezett hitelesítő adatok lehetővé teszik különböző hitelesítési módszerek meghatározását egyetlen alkalmazáshoz, ha különböző hitelesítési módszereket használ a műveletekhez és a webhookokhoz.

Legalapvetőbb formájában egy csoport egy `ConnectionProperty` listával rendelkezik. Ezeknek a tulajdonságoknak a nevei megjelennek a Blackbird felhasználói felületén, amikor új kapcsolatot hoznak létre. Alternatív megoldásként használhatja a `DisplayName` tulajdonságot a bemenet egyéni megjelenítésének definiálásához. A `Sensitive` tulajdonság használatával jelszó bemeneteket is definiálhat.

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

A kapcsolati tulajdonsága lehet egy legördülő lista véges értékekkel is. Használja erre a `DataItems` tulajdonságot:

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

Ami a következő legördülő menüt jeleníti meg:

![dropdown](~/assets/docs/dropdown.png)

## Kapcsolati tulajdonságok hitelesítő adatokká alakítása

Emlékszik, hogy minden kapcsolati tulajdonságot kulcs/érték párként tárolunk egy biztonságos tárolóban? A `CreateAuthorizationCredentialProviders` metódus átalakítja a tárolt kulcs/érték párok listáját elérhető hitelesítő adatok listájává, amelyeket átad műveleteknek és webhookoknak. Ez a módszer lehetővé teszi, hogy további információkat adjon meg itt a megvalósítástól függően. Legalapvetőbb formájában ez a módszer egyszerűen átalakítja a kulcs/érték párokat `AuthenticationCredentialsProvider` objektumokká.

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

Ha nincs szüksége semmilyen átalakításra, akkor egyszerűen implementálhatja ezt a rövidített formát:

```cs
public IEnumerable<AuthenticationCredentialsProvider> CreateAuthorizationCredentialsProviders(
    Dictionary<string, string> values) => values.Select(x => new AuthenticationCredentialsProvider(x.Key, x.Value)).ToList();
```

## OAuth kapcsolatok

A kapcsolati képernyőn az OAuth2 használatának jelzéséhez használja a `ConnectionAuthenticationType.OAuth2` kapcsolattípust. Ebben az esetben továbbra is hozzáadhat további kapcsolati tulajdonságokat, ha szüksége van rájuk.

Amikor OAuth2-t használunk, a `CreateAuthorizationCredentialsProviders` módszer egy extra kulcs/érték párt is kap, amelynek neve _access_token_. Ezt aztán át lehet alakítani `AuthenticationCredentialsProvider` objektummá.

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

### OAuth2 folyamatok definiálása

A Blackbird támogatja az OAuth2 kapcsolatokat igénylő alkalmazásokat. Jelenleg a Blackbird a következő standard folyamatokat támogatja:

- Authorization code (1.3.1. szakasz a [RFC](https://www.ietf.org/rfc/rfc6749.txt)-ben)
- Implicit grant (1.3.2. szakasz a [RFC](https://www.ietf.org/rfc/rfc6749.txt)-ben)

A kezdéshez implementálja az `IOAuth2AuthorizeService` és `IOAuth2TokenService` interfészeket.

Ezután adjon hozzá hivatkozásokat ezekre az interfészekre az `IApplication` interfészben.

Amikor az OAuth2 folyamat elindul, a Blackbird meghívja az `IOAuth2AuthorizeService` és `IOAuth2TokenService` példányait az `IApplication` interfész `GetInstance<T>` metódusának használatával. Implementálnia kell a logikát ezen interfészek példányainak visszaadására.

Nézzünk egy egyszerű implementációs példát:

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

Az `IOAuth2AuthorizeService` a kapcsolat és néhány, a Blackbird által befecskendezett érték alapján generálja az azonosítási URL-t. A következő példa az implicit grant folyamatot használja.

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

Az `IOAuth2TokenService` interfész meghatározza, hogyan kell értelmezni a Blackbird-hez való visszairányítást, és hogyan kell tárolni/kezelni a megadott tokeneket. A szótárként átadott tokenek a Blackbird-nek a `RequestToken` metódus meghívása után a kulcs/érték tárolóban tárolódnak. Később ezeket a `CreateAuthorizationCredentialProviders` metódus használhatja. Az `IOAuth2TokenService` a következő műveleteket valósítja meg:

- Az `IsRefreshToken` értéke igaz, ha a kulcs/érték tárolóban tárolt aktuális tokent frissíteni kell.
- A `RequestToken` megkapja az állapotot, kódot és egyéb értékeket, amelyeket átadtak az átirányítási URL-nek, amikor egy felhasználó létrehozza az OAuth kapcsolatát. Használja a megfelelő token lekéréséhez. A visszaadott szótár a kulcs/érték tárolóban tárolódik.
- A `RefreshToken` akkor hívódik meg, ha az `IsRefreshToken` igaz.
- A `RevokeToken` akkor hívódik meg, amikor a felhasználó eltávolítja a kapcsolatát.

A teljes példa [itt](https://github.com/bb-io/TemplateApp/blob/master/TemplateApp/Connections/OAuth/OAuth2TokenService.cs) található.

## Kapcsolatok validálása

Szeretnénk ellenőrizni, hogy a megadott hitelesítő adatok valóban helyesek-e, és közvetlen visszajelzést adni a felhasználónak a Blackbird felhasználói felületén. A kapcsolat validálása az `IConnectionValidator` interfész feladata. A `ValidateConnection` metódusnak vissza kell adnia egy objektumot, amely jelzi, hogy a kapcsolat érvényes-e, és opcionálisan a hibaüzenetet, amely megjelenítésre kerül.

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

Miután mindez be van állítva, a Blackbird most már meg tudja jeleníteni a kapcsolati űrlapot a felhasználónak.

![connection](~/assets/docs/connection_modal.png)

## Hozzáférés a hitelesítő adatokhoz műveletekben és eseményekben

Mint korábban említettük, hozzáféréssel rendelkezik a kulcs/érték tárolóban tárolt hitelesítő adatokhoz a műveletekben és eseményekben. A hitelesítő adatokat az `InvocationContext` objektum kapja meg, amely a `BaseInocable`-től örökölt bármely osztályba injektálódik más környezeti változók mellett. Használja az `InvocationContext.AuthenticationCredentialsProviders` tulajdonságot a kulcs/érték párok lekéréséhez, ahogyan azok visszatérnek a `ConnectionDefinition` osztály `CreateAuthorizationCredentialsProviders` metódusától.