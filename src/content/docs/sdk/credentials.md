---
title: Defining credentials
description: Learn how to define custom credentials in a Blackbird project.
sidebar:
  label: Credentials
  order: 4
---

To tell Blackbird which custom credentials your application needs to prompt the user, you have to provide an implementation for the `IConnectionDefinition` interface.

All credentials are safely stored in a key vault in Blackbird, meaning that all credentials are stored as key/value pairs.

## Basic custom credentials

The `ConnectionPropertyGroups` property should implement a List of `ConnectionPropertyGroups`. Having credentials separated in different groups allows you to specify different authentication methods for a single app, if it uses different authentication methods for actions and webhooks.

In its most basic form, one group has a List of `ConnectionProperty`. The names of these properties will appear in the Blackbird UI when a new connection is made. You can alternatively use the `DisplayName` property to define a custom display of this input. You can also use the `Sensitive` property to define password inputs.

The `CreateAuthorizationCredentialProviders` method converts the list of key/value pairs stored in the key vault into an accessible list of credentials passed to actions and webhooks. Alternatively, you can specify more information here depending on your implementation. In its most basic form this method simply converts key/value pairs into `AuthenticationCredentialsProvider`.

```cs
using Blackbird.Applications.Sdk.Common.Authentication;
using Blackbird.Applications.Sdk.Common.Connections;

namespace Apps.DeepL.Connections
{
  public class ConnectionDefinition : IConnectionDefinition
  {
    public IEnumerable<ConnectionPropertyGroup> ConnectionPropertyGroups => new List<ConnectionPropertyGroup>()
    {
      new ConnectionPropertyGroup
      {
        Name = "Developer API key",
        AuthenticationType = ConnectionAuthenticationType.Undefined,
        ConnectionUsage = ConnectionUsage.Actions,
        ConnectionProperties = new List<ConnectionProperty>()
        {
          new ConnectionProperty("apiKey") { DisplayName = "API key" }
        }
      }
    };

    public IEnumerable<AuthenticationCredentialsProvider> CreateAuthorizationCredentialsProviders(Dictionary<string, string> values)
    {
      var apiKey = values.First(v => v.Key == "apiKey");
      yield return new AuthenticationCredentialsProvider(
        AuthenticationCredentialsRequestLocation.None,
        apiKey.Key,
        apiKey.Value
      );
    }
  }
}
```

## Defining OAuth2 credentials

To indicate that OAuth2 should be used in the connection screen, use the `ConnectionAuthenticationType.OAuth2` as the connection type. In this case you can still add additional connection properties if you need them.

When OAuth2 is used, the `CreateAuthorizationCredentialsProviders` method will also receive an extra key/value pair named _access_token_. This can then be converted into a `AuthenticationCredentialsProvider`.

```cs
public IEnumerable<ConnectionPropertyGroup> ConnectionPropertyGroups => new List<ConnectionPropertyGroup>
{
  new()
  {
    Name = "OAuth2",
    AuthenticationType = ConnectionAuthenticationType.OAuth2,
    ConnectionUsage = ConnectionUsage.Actions,
    ConnectionProperties = new List<ConnectionProperty>
    {
      new("client_id"){DisplayName = "Client ID"},
      new("url"){DisplayName = "URL"},
    }
  },
};

public IEnumerable<AuthenticationCredentialsProvider> CreateAuthorizationCredentialsProviders(Dictionary<string, string> values)
{
  var token = values.First(v => v.Key == "access_token");
  yield return new AuthenticationCredentialsProvider(
    AuthenticationCredentialsRequestLocation.Header,
    "Authorization",
    $"Bearer {token.Value}"
  );
  var url = values.First(v => v.Key == "url");
  yield return new AuthenticationCredentialsProvider(
    AuthenticationCredentialsRequestLocation.None,
    "url",
    url.Value
  );
}
```
