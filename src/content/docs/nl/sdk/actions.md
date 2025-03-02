---
locale: nl
title: Acties Definiëren
description: Leer hoe je acties definieert in een Blackbird project.
sidebar:
  label: Actions
  order: 4
---

Je kunt de SDK gebruiken om acties te definiëren die in je app moeten verschijnen. In tegenstelling tot andere workflow orchestration platforms komen acties in Blackbird niet noodzakelijkerwijs 1:1 overeen met een endpoint. Vaak passen we de actie aan om gebruiksvriendelijker te zijn en/of voegen we extra functionaliteit toe voor het gemak.

## Blackbird naar acties verwijzen

Acties in een Blackbird project worden gedefinieerd als methoden in een klasse met het `ActionList` attribuut. Deze methoden hebben het `Action` attribuut nodig. De basisstructuur van een actie ziet er als volgt uit:

```cs
// Om zichtbaar te zijn voor Blackbird, voeg het [ActionList] attribuut toe
[ActionList]
public class MyActions : BaseInvocable
{
  // [...]

  // Alle methoden in deze klasse met een [Action] attribuut zullen zichtbaar zijn als acties in Blackbird
  [Action("Translate", Description = "Translate a string")]
  public async Task<TextResult> Translate([ActionParameter] TextTranslationRequest request)
  {
    // Doe hier iets met het verzoek

    return new TextResult{ Translation = "My translation" }
  }
}
```

Argumenten van methoden die het `ActionParameter` attribuut gebruiken, zijn invoerwaarden van de actie in de Bird editor. Als de actie geen invoerparameters heeft, kan het argument ontbreken.

Het `Action` attribuut neemt een string als eerste argument. Dit wordt de weergavenaam van de actie in Blackbird. Je kunt ook een optioneel Description argument opgeven dat in Blackbird wordt weergegeven.

De velden in de uitgevoerde klasse zijn automatisch beschikbaar in de Bird editor in volgende stappen. Actiemethoden kunnen asynchroon zijn - maar dit is geen vereiste.

> Opmerking: De naam van je actiemethode kan niet worden gewijzigd, Blackbird zou dit interpreteren als een verwijderde en nieuw aangemaakte actie.

## Weergavenamen voor invoerwaarden definiëren

Het `[ActionParameter]` attribuut kan worden toegevoegd aan elk acceptabel argument (strings, getallen, booleans, datums, lijsten) maar ook aan klassen. Wanneer het aan de klasse wordt toegevoegd, zal Blackbird eenvoudigweg alle eigenschappen van deze klasse als invoerargumenten weergeven.

Het `[Display]` attribuut kan worden gebruikt op zowel klasse-eigenschappen als invoerargumenten om te definiëren hoe de variabele moet worden genoemd in de Blackbird UI. Daarnaast kan ook een beschrijving worden gegeven.

```cs
public class GetBerryRequest
{
    // Eigenschappen moeten display-attributen hebben die de gebruiksvriendelijke naam van de variabele bevatten
    [Display("Berry name", Description = "The name of the berry")]
    public string BerryName { get; set; }
}
```

Deze klasse wordt omgezet naar:

![connection](~/assets/docs/berry.png)

Net als bij invoerargumenten werkt het `[Display]` attribuut ook op de retourtypen van je acties om ze gebruiksvriendelijke namen te geven.

### Attributen negeren

Je kunt het `[DefinitionIgnore]` attribuut gebruiken om een eigenschap te verbergen in Blackbird.

```cs
public class BerryResponse
{
    [Display("Berry ID", Description = "The ID of the berry")]
    public string Id { get; set; }

    [Display("Berry name", Description = "The name of the berry")]
    public string Name { get; set; }

    [DefinitionIgnore]
    public string InternalReference { get; set; }
}
```

## Optionele invoer

Standaard zijn alle invoerparameters verplicht in de Blackbird UI. Je kunt elke invoer optioneel maken door de waarde nullable te maken (`?` in C#).

```cs
public class CreateCallbackRequest
{
    // Deze invoer is nu optioneel
    [Display("Action")] public string? Action { get; set; }
    [Display("Callback URL")] public string CallbackUrl { get; set; }
}
```

## Je verbinding gebruiken

Nu we weten hoe we aangepaste code definiëren die wordt uitgevoerd wanneer we een actie aanroepen, laten we nu ook de verbinding gebruiken die we eerder hebben gedefinieerd.
In Blackbird kan elke klasse overerven van `BaseInvocable`. Wanneer dit gebeurt, geeft Blackbird de aanroepingscontext door aan deze klasse wanneer deze wordt geïnstantieerd. De context bevat handige informatie zoals de Bird ID, Flight ID, maar het belangrijkste: de authenticatiegegevens.

```cs
[ActionList]
public class MyActions : BaseInvocable
{
  // Maak een constructor die de InvocationContext doorgeeft
  public MyActions(InvocationContext invocationContext) : base(invocationContext) {}

  [Action("Translate", Description = "Translate a string")]
  public async Task<TextResult> Translate([ActionParameter] TextTranslationRequest request)
  {
    var credentials = InvocationContext.AuthenticationCredentialsProviders;

    // Gebruik de credentials om een API-aanvraag te doen

    return new TextResult{ Translation = "My translation" }
  }
}
```