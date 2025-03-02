---
title: Data Sources
description: Дізнайтеся, як визначати статичні та динамічні джерела даних для вхідних параметрів ваших дій та подій.
sidebar:
  label: Data Sources
  order: 6
---

Досі ми вивчали, як визначити з'єднання, дії та події. Поєднання цих компонентів може створити повноцінний працюючий додаток. Однак вашим користувачам, швидше за все, все одно доведеться "жорстко кодувати" багато значень, таких як коди мов, ідентифікатори сутностей, переліки статусів тощо. Саме тому ми створили _Data sources_. Джерела даних дозволяють вказати для певних вхідних параметрів (як для дій, так і для подій), які дані Blackbird може відображати у випадаючому списку. Це економить час користувача на копіювання та вставку! Існує два типи джерел даних: _статичні джерела даних_ та _динамічні джерела даних_. Статичні джерела даних дозволяють визначити скінченний список значень, які ніколи не змінюються. Прикладом цього можуть бути різні статуси, в яких може перебувати проєкт. Динамічні джерела даних дозволяють отримувати динамічний вміст на основі з'єднання користувача. Прикладом цього може бути список існуючих проєктів. Спочатку ми розглянемо як працюють динамічні джерела даних, а потім перейдемо до статичних.

## Динамічні джерела даних

Давайте розглянемо анатомію динамічного джерела даних:

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

Ми бачимо, що клас "обробник" джерела даних може успадковувати від `BaseInvocable`, що означає, що у вас є повний доступ до контексту (включно з обліковими даними).

`DataSourceContext.SearchString` надає рядок пошуку, введений користувачем. Ви можете використовувати його для фільтрації результатів.

Ви повинні повернути `IEnumerable<DataSourceItem>`, де аргумент `value` об'єкта `DataSourceItem` представляє значення, яке буде "заповнене", наприклад, ID певного статусу або сутності. Другий аргумент — це відображуване ім'я.

![connection](~/assets/docs/dynamic_input.png)

### Розширений контекст

Ви також можете отримати ще більше контексту, ніж просто рядок пошуку. Що, якщо ви хочете знати значення інших полів, які були вибрані в дії? Ви можете передати `[ActionParameter]` в конструктор, щоб бачити інші поля, які заповнив користувач.

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

### Використання

Просто додайте атрибут `[DataSource]` до будь-якого вхідного значення типу `string` або `IEnumerable<string>`, і поле вільного введення перетвориться на випадаючий список!

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

## Статичні джерела даних

Статичні джерела даних дуже схожі на динамічні. Основна відмінність у використанні полягає в інтерфейсі та атрибутах, які ви повинні використовувати для їх реалізації. По-друге, ви повинні розуміти, що ви не можете отримати контекст з'єднання. Натомість ви просто повинні повернути попередньо визначений `IEnumerable<DataSourceItem>`.

Blackbird компілює ці статичні джерела даних під час збірки, що означає, що коли хтось використовує ваш додаток, вони не побачать індикатор завантаження при натисканні на статичний випадаючий список. Замість цього значення будуть відображатися миттєво.

> Якщо ваш додаток не завантажується належним чином у Blackbird, це може бути тому, що у вас є дублікати значень у статичних джерелах даних.

Клас статичного джерела даних:

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

І його використання як атрибута:

```cs
    [Display("Pokemon type")]
    [StaticDataSource(typeof(StaticDataSourceHandler))]
    public string PokemonType { get; set; }
```