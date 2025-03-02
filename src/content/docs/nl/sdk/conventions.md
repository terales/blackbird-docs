---
title: App Conventies
description: Gebruik de kennis die we hebben opgedaan bij het bouwen van meer dan 100 apps en integraties.
sidebar:
  label: App Conventies
  order: 9
  hidden: false
---

Zoals je weet, kunnen Blackbird apps worden gezien als mini-producten waarbij elke gebeurtenis, actie en dropdown een doelbewuste gebruikerservaring biedt met als doel workflows op de eenvoudigste manier mogelijk te maken. We hebben meer dan 100 apps en integraties gebouwd en gedurende deze tijd hebben we geleerd welke standaarden en conventies moeten worden nageleefd om een gemakkelijke en consistente gebruikerservaring te bieden. De conventies die je hieronder vindt, worden toegepast op alle Blackbird openbare apps (waar mogelijk) en kunnen een waardevolle bron voor je zijn bij het bouwen van je eigen apps.

## 1. Types

In Blackbird kunnen gebruikers de volgende 5 basistypes tegenkomen: tekst (string), getal (elk numeriek type in .NET), datums [(`DateTime`)](https://learn.microsoft.com/en-us/dotnet/api/system.datetime?view=net-8.0), bestanden [(`FileReference`)](/blackbird-docs/sdk/files) en booleaanse waarden. Daarnaast kan de gebruiker ook 'meervoudige' versies van de bovengenoemde types vinden, die in de SDK worden aangeduid als `IEnumerable<string>`, `IEnumerable<FileReference>`, enz.

### 1.1 - ID-types

Sommige apps behandelen ID's als gehele getallen, sommige als longs, sommige als strings. **In Blackbird behandelen we alle ID-achtige variabelen als strings**. Dit betekent dat elke variabele die een identifier van een of andere soort is, moet worden geconverteerd naar en van een string. De reden hiervoor is dat als we sommige apps hebben die ID's als getallen behandelen en sommige als strings, we geen interoperabiliteit kunnen bieden voor het opslaan van ID's op andere plaatsen. Als je bijvoorbeeld een ID wilt opslaan in een aangepast veld, kun je over het algemeen alleen string-types opslaan. Daarom zou het ophalen van een waarde uit dat aangepaste veld niet interoperabel zijn met een numerieke ID-invoer. Ten tweede zou niemand rekenkundige bewerkingen op ID's moeten uitvoeren.

> ⚠️ Let op - [System.Text.Json (standaard RestSharp deserializer)](https://learn.microsoft.com/en-us/dotnet/standard/serialization/system-text-json/migrate-from-newtonsoft?pivots=dotnet-6-0#non-string-values-for-string-properties) deserialiseert standaard niet van int, float, etc. naar string.

### 1.2 - Datum-types

Datums worden in veel toepassingen gebruikt. Echter, geen enkele toepassing is consistent in het formaat dat ze gebruiken om datums weer te geven. **In Blackbird moet alles wat een datum voorstelt worden omgezet naar [`DateTime`](https://learn.microsoft.com/en-us/dotnet/api/system.datetime?view=net-8.0)**. Of het nu gaat om een 'aangemaakt op' veld of een deadline. Zorg ervoor dat je datums DateTimes zijn en geen strings of longs. Het is de enige manier om applicaties interoperabel te maken.

### 1.3 - Array-types

Ook wel "multiple" genoemd in de Blackbird UI. Arrays duiden uiteraard een verzameling aan van een van de andere primitieve types of een complex klasseobject. Wanneer je een klasseobject retourneert, houd er dan rekening mee dat er geen geavanceerde bewerkingen kunnen worden uitgevoerd op dit type structuur. Voor array-types is de belangrijkste regel dat je **nooit null retourneert, maar altijd lege arrays**, zelfs als de onderliggende API graag null retourneert. Dit maakt null reference errors minder waarschijnlijk in de Blackbird gebruikerservaring.

## 2. Naamgeving

**Alle authenticatie-inloggegevens, acties, (webhook) gebeurtenissen, invoerparameters en uitvoerparameters moeten een gebruiksvriendelijke, beschrijvende korte naam hebben.** Als de beschrijvende naam onvoldoende is, kan een langere beschrijving worden toegevoegd die als popover in de Blackbird UI verschijnt.

> **💡 Tip**: Je kunt het [Display()] attribuut op bijna alles gebruiken om het een naam en optionele beschrijving te geven.

Alle namen die aan gebruikers worden getoond in de UI moeten zorgvuldig worden gekozen, de actie/gebeurtenis/parameter perfect weerspiegelen en kunnen de beschrijving gebruiken om belangrijke aanvullende informatie te beschrijven. Alle naamgevingsconventies zijn van toepassing op actienamen, actiebeschrijvingen, eigenschapweergavenamen, gegevensbronnen en verbindingseigenschappen.

### 2.1 - Hoofdlettergebruik

**Het eerste woord van elke naam moet een hoofdletter hebben. Geen enkel ander woord zou een hoofdletter moeten hebben**. Bijvoorbeeld:

> ❌ Create Draft Message

> ✅ Create draft message

Behalve voor afkortingen. **Alle afkortingen moeten volledig in hoofdletters zijn**. Dus ID en niet Id, URI en niet uri.

> ❌ Project id

> ✅ Project ID

### 2.2 - ID's

Een tijdlang hebben we het woord "ID" weggelaten uit invoer-/uitvoervariabelen die eigenlijk ID-parameters waren, in plaats daarvan noemden we het gewoon wat het was: Project, Translation, Task. Dit was een vergissing. Het is onduidelijk voor de gebruiker welke parameter dit vertegenwoordigt en werd vaak verward met bijvoorbeeld vertaalinhoud. **Elke variabele die een ID is, moet het woord ID bevatten**. Ook **noem een parameter nooit alleen "ID", wees altijd explicieter**, bijvoorbeeld "Company ID".

> ❌ ID

> ❌ Translation

> ✅ Translation ID

### 2.3 - Naamlengtes

Namen in de bird editor hebben niet te veel ruimte om mee te werken. Daarom moeten **eigenschap- en actienamen relatief beknopt zijn**. Als vuistregel geldt dat namen **niet meer dan ~40 tekens** mogen zijn.

> ❌ Add business phone number to contact's business details

> ✅ Update contact

## 3. Fouten

We willen **te allen tijde beschrijvende en bruikbare foutmeldingen aan gebruikers verstrekken**. Onze gebruikers kunnen niet-technisch zijn en we willen hen zo goed mogelijk assisteren. Vooral als het gaat om fouten waar de gebruiker iets aan kan doen, bijvoorbeeld wanneer ze een verkeerde variabele invoeren, wanneer hun authenticatiegegevens onjuist zijn, of wanneer hun systeem verkeerd is geconfigureerd.

### 3.1 - Fouten weergeven

Fouten in Blackbird worden eenvoudigweg als uitzonderingen gegooid, en Blackbird geeft het uitzonderingsbericht weer aan de gebruikers wanneer de flight wordt geïnspecteerd. Bij gebruik van `throw new Exception("Mijn foutmelding komt hier")` wordt de foutmelding aan de gebruiker getoond. We geven er echter de voorkeur aan om altijd de reguliere uitzonderingen die een gebruiker ziet te elimineren. In plaats daarvan moeten de twee uitzonderingsklassen `PluginMisconfigurationException` en `PluginApplicationException` worden gebruikt. Lees de [errors pagina](/blackbird-docs/sdk/errors) voor een gedetailleerde beschrijving.

Om een goede ervaring te bieden, **moeten fouten worden opgevangen en waar mogelijk moet een gedetailleerde beschrijving worden weergegeven**. En **een configuratiefout moet de gebruiker altijd informeren over hoe ze hun probleem kunnen oplossen**.

### 3.2 - Snelheidslimieten

Bijna elke API heeft een beleid voor snelheidslimieten. Deze snelheidslimiet is vaak te vinden in de documentatie van de API. Het is de plicht van de app-ontwikkelaar om ervoor te zorgen dat fouten met snelheidslimieten niet doorbubbelen naar de Blackbird-gebruiker op het actieniveau. Dit betekent dat **er rekening moet worden gehouden met snelheidslimieten** door foutenreacties met betrekking tot snelheidslimieten te identificeren (soms worden deze toegevoegd aan response headers) en task sleeps te implementeren om de hoeveelheid verzoeken die je code doet te vertragen.

## 4. Verbindingen

Blackbird-verbindingen kunnen worden gedefinieerd met een willekeurig aantal "connection definition fields". Het heeft ook de mogelijkheid om speciale OAuth2-verbindingen op te zetten. OAuth2 biedt een ongelooflijke gebruikerservaring. Het stelt onze gebruikers namelijk in staat om met slechts één klik verbinding te maken met Blackbird. **Als we kunnen, willen we altijd OAuth2 gebruiken** en voorkomen dat onze gebruikers client id's, client secrets, machtigingen, etc. moeten invoeren.

Ten tweede, houd er rekening mee dat verbindingsvelden ook weergavenamen, beschrijvingen en een optionele gevoelige parameter kunnen hebben. **Wachtwoorden en API-sleutels moeten de vlag `Sensitive = true` hebben**, waardoor ze als wachtwoorden in Blackbird verschijnen.

Verbindingsveldnamen moeten kort, beschrijvend en duidelijk zijn. Uit de veldnaam moet de gebruiker kunnen opmaken welke exacte gegevens van hem worden verwacht.

![Connection definition](~/assets/docs/conventions/connection_fields.png)

![Connection details](~/assets/docs/conventions/connection_details.png)

## 5. Gegevensbronnen

Veel invoerparameters voor acties hebben slechts een bepaald aantal toegestane invoer. Voor het gemak van de gebruiker en de algemene ervaring kunnen we gegevensbronnen definiëren die Blackbird vertellen welke waarden zijn toegestaan en waaruit de gebruiker kan selecteren.

### 5.1 - Statische gegevensbronnen

Statische gegevensbronnen zijn ontworpen voor variabelen die vooraf zijn gedefinieerd en eindig zijn. Dit betekent elke vorm van opgesomde typen, ID's die opgesomde typen vertegenwoordigen, geconfigureerde talen, etc. In plaats van dat de gebruiker moet raden welke waarden de API verwacht, moeten we **altijd statische gegevensbronnen gebruiken voor invoer met een eindig aantal mogelijke opties die vooraf kunnen worden bepaald**. Voorbeelden van statische gegevensbronnen zijn:

- Statussen, voor projecten of opdrachten in een TMS of projectmanagement-app.
- Talen, wanneer de invoerparameter een bron-/doeltaal is en de app je niet toestaat om je eigen talen te configureren.

### 5.2 - Dynamische gegevensbronnen

[Dynamische gegevensbronnen](https://docs.blackbird.io/sdk/datasources/#dynamic-data-sources), zoals het woord al suggereert, worden gebruikt wanneer de gegevens moeten worden geladen vanuit de verbinding. Klassieke voorbeelden van dynamische gegevensbronnen zijn:

- Projecten, wanneer de invoerparameter een Project ID is in een TMS-app.
- Kanalen, wanneer de invoerparameter een Channel ID is voor Slack.
- Talen, wanneer de invoerparameter een bron-/doeltaal is en de talen zijn geconfigureerd in de applicatie.
- Mappen, in bestandsbeheeracties bij het selecteren waar bestanden moeten worden bijgewerkt/gedownload naar/van.

**Elke invoerparameter die een eindig aantal mogelijke waarden heeft, maar die afhankelijk zijn van de verbinding van de gebruiker, moet een gedefinieerde dynamische gegevensbron hebben.**

Soms heb je, om de gegevens van een gegevensbron te laden, meer informatie nodig van de gebruiker. Een voorbeeld hiervan zou een structuur zijn waarbij projecten meerdere opdrachten kunnen hebben. Om een dynamische dropdown te tonen voor alle opdrachten in het project, vereist de API en de onderliggende code eerst de Project ID. In deze gevallen moet je [dynamische gegevensbronnen met geavanceerde context](/blackbird-docs/sdk/datasources/#advanced-context) gebruiken. Wees wel voorzichtig bij het gebruik van geavanceerde contexten, want er zijn gevallen waarin je denkt dat een geavanceerde context nuttig zou zijn, terwijl deze in werkelijkheid de gebruiker blokkeert bij het bouwen van zijn workflow. Een voorbeeld hiervan is een dropdown voor het toevoegen van taalinformatie bij het uploaden van een bestand. Het lijkt misschien een goed idee om de geconfigureerde bestanden op het project te laden, maar de gebruiker kan een workflow aan het bouwen zijn waarbij de Project ID uit een andere stap komt. De gebruiker kan dus geen project selecteren voordat hij een taal selecteert. Dus de taaldropdown zou niet afhankelijk moeten zijn van het project, maar van alle mogelijke talen.

Als vuistregel geldt, **voeg alleen geavanceerde context dropdowns toe als je er zeker van bent dat alle afhankelijke informatie altijd bekend is op het moment van het bouwen van een bird**.

Tot slot zouden dynamische gegevensbronnen in theorie honderden items kunnen retourneren in combinatie met paginering. Dat is niet wenselijk in Blackbird omdat de gebruiker langer zal moeten wachten om hun suggesties te zien. In plaats daarvan zouden **dynamische gegevensbronnen hooguit één API-pagineringsgrootte aan gegevens moeten retourneren**. Dit is ook omdat de gebruiker wordt aangemoedigd om de zoekfunctie in de dropdown te gebruiken. **De zoekinvoer naar dynamische gegevensbronnen moet een filtering van gegevens in de code activeren**, bij voorkeur door queryparameters in API-eindpunten te gebruiken.

## 6. Acties

Acties zijn waarschijnlijk het element waarmee mensen het meest interactie hebben in de bird editor, en dus in Blackbird. Het is gunstig voor een gebruiker als onze acties in verschillende apps dezelfde conventies volgen, zodat de leercurve van een nieuwe app drastisch wordt verminderd.

### 6.1 - Filosofie

De filosofie in de kern van Blackbird is dat **ontwikkelaars een app bouwen zodat gebruikers deze op de eenvoudigste manier kunnen combineren met andere apps**. Elke app kan worden beschouwd als een eigen product, en elke actie als een eigen functie met een zeer doelbewuste gebruikerservaring. Dit is een gebied waar Blackbird verschilt van orkestratietools die voornamelijk gericht zijn op ontwikkelaars. Waar die tools vereisen dat de gebruikers meer gecompliceerde technische concepten en structuren in het orkestratie-gedeelte gebruiken, vertrouwt Blackbird op ontwikkelaars die acties leveren die geen extra stappen vereisen om gegevens te behandelen of manipuleren. In essentie betekent dit dat de in- en uitvoer van acties in lijn moeten zijn met de verw