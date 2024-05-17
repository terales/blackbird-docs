---
title: Data sources
description: Learn how to define static dynamic data sources for your action and event inputs.
sidebar:
  label: Data sources
  order: 6
---

So far we have learned how to define your connections, actions and events. The combination of these can create a full-fletched usable app. However, your users will most likely still have to 'hard-code' a lot of values like language codes, entity IDs, enumerated statusses, etc. That's why we created _Data sources_. Data sources allow you to specify for certain input paremeters (on both actions and events) what data Blackbird can display in a dropdown. This saves the user time copying and pasting! There are two types of data sources: _static data sources_ and _dynamic data sources_. Static data sources allow you to define a finite list of values that never change. An example of this could be different statusses a project can be in. Dynamic data sources allow you to fetch dynamic content based on the connection of the user. An example of this would be a list of existing projects. We're first going to discuss how dynamic data sources work and then we'll look at static data sources.

## Dynamic data sources

Let's take a look at the anatomy of a dynamic data source:

```cs
/// <summary>
/// Data source handler for asynchronous dynamic inputs.
/// It provides static data on the UI, so that user can choose values from the dropdown instead of printing it manually.
/// </summary>
public class AsyncDataSourceHandler : AppInvocable, IAsyncDataSourceHandler
{
    public AsyncDataSourceHandler(InvocationContext invocationContext) : base(invocationContext)
    {
    }

    /// <summary>
    /// Fetches data for the dynamic inputs and returns it as a dictionary.
    /// Key of the dictionary represents data needed in the app itself, e.g. ID.
    /// Values is displayed to user in the UI, so that it should be a user-friendly name of the item
    /// </summary>
    public async Task<Dictionary<string, string>> GetDataAsync(DataSourceContext context,
        CancellationToken cancellationToken)
    {
        var request = new AppRestRequest(ApiEndpoints.Berry, Method.Get, Creds);
        var response = await Client.ExecuteWithHandling<ListResponse<Berry>>(request);

        return response.Results
            // We need to pay attention to SearchString in the context
            // So that we return only values that match user search request
            .Where(x => context.SearchString == null ||
                        x.Name.Contains(context.SearchString, StringComparison.OrdinalIgnoreCase))
            .ToDictionary(x => x.Name, x => x.Name.ToPascalCase());
    }
}
```

We see that the data source 'handler' class can inherit from `BaseInvocable`, meaning that you have complete access to the context (including credentials).

The `DataSourceContext.SearchString` provides the typed in search string by the user. You can use this to filter your result.

You should return a `Dictionary<string, string>` where the key represents the value that will be "filled in" e.g. the ID of a certain status or entity and the value is the display name.

![connection](../../../assets/docs/dynamic_input.png)

### Advanced context

You can also get even more context than just the search string. What if you want to know the values of some other fields that were selected in an action? You can pass an `[ActionParameter]` to the constructor in order to see the other fields the user filled in.

```cs
public class DataSourceHandlerWithParameters : AppInvocable, IAsyncDataSourceHandler
{
    // Saving input model to use it while fetching data
    private readonly DataSourceWithParametersRequest _request;

    protected DataSourceHandlerWithParameters(InvocationContext invocationContext,
        // Specifying the same model where DataSourceHandlerWithParameters was added
        [ActionParameter] DataSourceWithParametersRequest request) : base(invocationContext)
    {
        _request = request;
    }

    public async Task<Dictionary<string, string>> GetDataAsync(DataSourceContext context,
        CancellationToken cancellationToken)
    {
        // Throwing error if parameters are not specified
        if (string.IsNullOrWhiteSpace(_request.Url))
            throw new("You should input URL first");

        if (string.IsNullOrWhiteSpace(_request.EntityId))
            throw new("You should input Entity ID first");

        // Fetching data based on provided parameters
        var request = new AppRestRequest($"{_request.Url}/{_request.EntityId}", Method.Get, Creds);
        return await Client.ExecuteWithHandling<Dictionary<string, string>>(request);
    }
}
```

### Usage

Simply add the `[DataSource]` attribute to any `string` or `IEnumerable<string>` typed input value, and the free typing field will turn into a dropdown!

```cs
public class GetBerryRequest
{
    // Properties must have display attributes which contain user-friendly name of variable
    [Display("Berry name", Description = "The name of the berry")]
    // Applying data source handler to the property
    [DataSource(typeof(AsyncDataSourceHandler))]
    public string BerryName { get; set; }
}
```

## Static data sources

Static data sources are very similar to dynamic data sources. The main difference in usage is the interface and attributes you have to use to implement then. Secondly, you have to be aware that you cannot get a connection context. You should instead simply return a pre-defined dictionary of keys (the underlying data) and values (the displayed names in the dropdown).

Blackbird compiles these static data sources on build time, meaning that when someone uses your app, they won't see a loading spinner when clicking on a static dropdown. Instead the values will be displayed instantly.

Static data source class:

```cs
public class ProjectStatusDataHandler : IStaticDataSourceHandler
{
    public Dictionary<string, string> GetData()
     => new()
    {
        {"Draft", "Draft"},
        {"Pending", "Pending"},
        {"Approved", "Approved"},
        {"Delivered", "Delivered"},
        {"Invoiced", "Invoiced"},
    };
}
```

And its usage as an attribute:

```cs
    [Display("Project statuses")]
    [StaticDataSource(typeof(ProjectStatusDataHandler))]
    public List<string>? ProjectStatuses { get; set; }
```
