---
title: Adding OAuth2 authentication flow
description: Learn how to add OAuth2 to a Blackbird project.
sidebar:
  label: OAuth2
  order: 5
---

Blackbird can support apps that require OAuth2 connections. Currently Blackbird supports the following standard flows:

- Authorization code (Section 1.3.1 of [RFC](https://www.ietf.org/rfc/rfc6749.txt) )
- Implicit grant (Section 1.3.2 of [RFC](https://www.ietf.org/rfc/rfc6749.txt) )

To get started, implement interfaces for `IOAuth2AuthorizeService` and `IOAuth2TokenService`.

Then add references to these interfaces in your `IApplication`.

When the OAuth2 flow is started, Blackbird calls instances of the `IOAuth2AuthorizeService` and `IOAuth2TokenService` using the `GetInstance<T>` method of the `IApplication` interface. You should implement logic to return instances of these interfaces.

Let's see a simple implementation example:

```cs
public class SampleApplication : IApplication
{
  private readonly Dictionary<Type, object> _container;
  public string Name => "Sample Application";

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
