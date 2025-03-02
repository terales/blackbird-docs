---
locale: nl
title: Data Sources
description: Leer hoe je statische en dynamische gegevensbronnen definieert voor je actie- en event-invoer.
sidebar:
  label: Data Sources
  order: 6
---

Tot nu toe hebben we geleerd hoe je je verbindingen, acties en events definieert. De combinatie hiervan kan een volledig bruikbare app creëren. Echter zullen je gebruikers waarschijnlijk nog veel waarden moeten 'hardcoderen' zoals taalcodes, entiteit-ID's, statuswaarden, etc. Daarom hebben we _Data sources_ gecreëerd. Data sources stellen je in staat om voor bepaalde invoerparameters (zowel voor acties als events) te specificeren welke gegevens Blackbird kan weergeven in een dropdown. Dit bespaart de gebruiker tijd bij het kopiëren en plakken! Er zijn twee soorten gegevensbronnen: _statische gegevensbronnen_ en _dynamische gegevensbronnen_. Statische gegevensbronnen stellen je in staat om een eindige lijst van waarden te definiëren die nooit veranderen. Een voorbeeld hiervan kunnen verschillende statussen zijn waarin een project zich kan bevinden. Dynamische gegevensbronnen stellen je in staat om dynamische inhoud op te halen op basis van de verbinding van de gebruiker. Een voorbeeld hiervan zou een lijst van bestaande projecten zijn. We gaan eerst bespreken hoe dynamische gegevensbronnen werken en daarna kijken we naar statische gegevensbronnen.

## Dynamische gegevensbronnen

Laten we kijken naar de anatomie van een dynamische gegevensbron:

```cs
/// <summary>
/// Data source handler for asynchronous dynamic inputs.
/// It provides static data on the UI, so that user can choose values from the dropdown instead of printing it manually.
/// </summary>
public class AsyncDataSourceHandler : AppInvocable, IAsyncDataSourceItemHandler
{
    public AsyncDataSourceHandler(InvocationContext invocationContext) : base(invocationContext)
    {
    }

    /// <summary>
    /// Fetches data for the dynamic inputs and returns it as a list of options.
    /// </summary>
    public async Task<IEnumerable<DataSourceItem>> GetDataAsync(DataSourceContext context, CancellationToken cancellationToken)
    {
        var request = new AppRestRequest(ApiEndpoints.Berry, Method.Get, Creds);
        var response = await Client.ExecuteWithHandling<ListResponse<Berry>>(request);

        return response.Results
            // We need to pay attention to SearchString in the context
            // So that we return only values that match user search request
            .Where(x => context.SearchString == null ||
                        x.Name.Contains(context.SearchString, StringComparison.OrdinalIgnoreCase))
            .Select(x => new DataSourceItem(x.Id, x.Name));
    }
}
```

We zien dat de 'handler' klasse van de gegevensbron kan overerven van `BaseInvocable`, wat betekent dat je volledige toegang hebt tot de context (inclusief inloggegevens).

De `DataSourceContext.SearchString` biedt de ingetypte zoekopdracht van de gebruiker. Je kunt dit gebruiken om je resultaat te filteren.

Je moet een `IEnumerable<DataSourceItem>` retourneren waarbij het `value` argument van een `DataSourceItem` de waarde vertegenwoordigt die zal worden "ingevuld", bijvoorbeeld de ID van een bepaalde status of entiteit. Het tweede argument is de weergegeven naam.

![connection](~/assets/docs/dynamic_input.png)

### Geavanceerde context

Je kunt ook meer context krijgen dan alleen de zoekopdracht. Wat als je de waarden wilt weten van andere velden die in een actie zijn geselecteerd? Je kunt een `[ActionParameter]` aan de constructor doorgeven om de andere velden te zien die de gebruiker heeft ingevuld.

```cs
public class DataSourceHandlerWithParameters : AppInvocable, IAsyncDataSourceItemHandler
{
    // Saving input model to use it while fetching data
    private readonly DataSourceWithParametersRequest _request;

    protected DataSourceHandlerWithParameters(InvocationContext invocationContext,
        // Specifying the same model where DataSourceHandlerWithParameters was added
        [ActionParameter] DataSourceWithParametersRequest request) : base(invocationContext)
    {
        _request = request;
    }

    public async Task<IEnumerable<DataSourceItem>> GetDataAsync(DataSourceContext context, CancellationToken cancellationToken)
    {
        // Throwing error if parameters are not specified
        if (string.IsNullOrWhiteSpace(_request.Url))
            throw new("You should input URL first");

        if (string.IsNullOrWhiteSpace(_request.EntityId))
            throw new("You should input Entity ID first");

        // Fetching data based on provided parameters
        var request = new AppRestRequest($"{_request.Url}/{_request.EntityId}", Method.Get, Creds);
        return await Client.ExecuteWithHandling<IEnumerable<DataSourceItem>>(request);
    }
}
```

### Gebruik

Voeg simpelweg het `[DataSource]` attribuut toe aan elke invoerwaarde van het type `string` of `IEnumerable<string>`, en het vrije typveld verandert in een dropdown!

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

## Statische gegevensbronnen

Statische gegevensbronnen lijken sterk op dynamische gegevensbronnen. Het belangrijkste verschil in gebruik zijn de interface en attributen die je moet gebruiken om ze te implementeren. Ten tweede moet je je ervan bewust zijn dat je geen verbindingscontext kunt krijgen. In plaats daarvan moet je simpelweg een vooraf gedefinieerde `IEnumerable<DataSourceItem>` retourneren.

Blackbird compileert deze statische gegevensbronnen tijdens het bouwen, wat betekent dat wanneer iemand je app gebruikt, ze geen laadspinner zullen zien bij het klikken op een statische dropdown. In plaats daarvan worden de waarden direct weergegeven.

> Als je app niet goed wordt geüpload naar Blackbird, kan dit komen doordat je dubbele waarden in je statische gegevensbronnen hebt.

Statische gegevensbronneklasse:

```cs
public class StaticDataSourceHandler : IStaticDataSourceItemHandler
{
    public IEnumerable<DataSourceItem> GetData() =>
    [
        new("water_electric", "Water/Electric"),
        new("fighting_psychic", "Fighting/Psychic"),
        new("grass_flying", "Grass/Flying"),
    ];
}
```

En het gebruik ervan als attribuut:

```cs
    [Display("Pokemon type")]
    [StaticDataSource(typeof(StaticDataSourceHandler))]
    public string PokemonType { get; set; }
```