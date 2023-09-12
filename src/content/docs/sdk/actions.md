---
title: Defining actions
description: Learn how to define actions in a Blackbird project.
sidebar:
  label: Actions
  order: 6
---

You can use the SDK to define actions that should appear in your app. Contrary to other workflow orchestration platforms, actions in Blackbird don't necessarily correlate 1:1 with an endpoint. Often we tweak the action to be more user-friendly and/or add extra functionality for convenience.

## Pointing Blackbird to actions

Actions in a Blackbird project are defined as methods in a class that has the `ActionList` attribute. These methods will need the `Action` attribute.

```cs
[ActionList]
public class MyActions
{
  // All methods in this class with an [Action] attribute will be visible as actions in Blackbird
  [Action("Translate", Description = "Translate a string")]
  public async Task<TextResult> Translate([ActionParameter] TextTranslationRequest request)
  {
    // Do something here with the request
    return new TextResult{ Translation = "My translation" }
  }
}
```

Arguments of methods that use the `ActionParameter` attributes are inputs of the action in the Bird editor. If the action has no input parameters, the argument might be missing. One can also add `IEnumerable<AuthenticationCredentialsProvider> authenticationCredentialsProviders` as the first argument to this method, however we recommend using `BaseInvocable` instead.

The `Action` attribute will take a string as its first argument. This will be the display name of the action in Blackbird. You can also provide an optional Description argument that is displayed in Blackbird.

The fields in the outputted class will automatically be available in the Bird editor in subsequent steps. Action methods can be async - but this is not a requirement.

## Using your connection

Now that we know how to define custom code that executes when we call an action, let's now also use the connection that we have previously defined.
In Blackbird, any class can inherit from `BaseInvocable`. When this is done, Blackbird passes invocation context to this class when it is instantiated. The context includes handy information like the Bird ID, Flight ID, but most importantly: the authentication credentials.

```cs
[ActionList]
public class MyActions : BaseInvocable
{
  // Create a constructor that passes the InvocationContext
  public MyActions(InvocationContext invocationContext) : base(invocationContext) {}

  [Action("Translate", Description = "Translate a string")]
  public async Task<TextResult> Translate([ActionParameter] TextTranslationRequest request)
  {
    var credentials = InvocationContext.AuthenticationCredentialsProviders;

    // Use the crednetials to make an API request

    return new TextResult{ Translation = "My translation" }
  }
}
```
