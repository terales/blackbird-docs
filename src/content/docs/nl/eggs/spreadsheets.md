---
locale: nl
title: Veelvoorkomende gebruikstoepassingen voor Spreadsheets
description: Laten we dieper ingaan op veelvoorkomende gebruikstoepassingen rond spreadsheets
sidebar:
  label: Spreadsheets
  order: 4
  hidden: false
---

### Eggs: Uitgangspunten voor je Birds

In Blackbird zijn Eggs de zaden of blauwdrukken voor je workflows. Ze vertegenwoordigen de initiële ideeën die het potentieel hebben om volledig ontwikkelde Birds te worden.

In deze Egg-gids verkennen we enkele veelvoorkomende gebruikstoepassingen rond spreadsheets met behulp van [Google Sheets](../../apps/google-sheets/), [Microsoft Excel](../../apps/microsoft-excel/) of [Airtable](../../apps/airtable/). Zoek **Downloadbare Eggs** onder de voorbeelden - download JSON-workflows om [te importeren in je Nest](../../eggs/spreadsheets/#importing-eggs), voeg je verbindingen toe, maak gewenste aanpassingen en **vlieg**.

## Gebruikstoepassingen

### Logging en Rapportage

Spreadsheets kunnen een krachtig hulpmiddel zijn om belangrijke gegevenspunten vast te leggen in verschillende fasen van een workflow. Niet alleen voor gebruik als interne logs, maar ook het verzenden van workflow-informatie naar een externe spreadsheet biedt verbeterde zichtbaarheid en mogelijke integratie met dashboardtools voor realtime analyses.

De actie `Add new sheet row` in Blackbird is ideaal voor dit doel. Het **voegt een nieuwe rij toe aan het einde van het gebruikte bereik van de spreadsheet** en maakt het mogelijk om meerdere gegevenspunten in opeenvolgende cellen door te geven, waarbij de volgorde die je in Blackbird specificeert behouden blijft. Het controleert ook of er rijen beschikbaar zijn (Google Sheets) en voegt er één toe als we aan het einde van de spreadsheet zijn.

![Add new sheet row](~/assets/docs/eggs/AddNewSheetRow.png)

### Zoeken en Bijwerken van Informatie

Het beheren van dynamische gegevens in spreadsheets omvat vaak het zoeken naar en bijwerken van specifieke informatie. De actie `Find sheet row` **zoekt naar een opgegeven waarde binnen een aangewezen kolom en geeft het rijnummer terug** waar de waarde werd gevonden (of null indien niet gevonden).
Voorbeeld: Je hebt mogelijk een kolom in je tabel met unieke bestel-ID's. Elke keer dat er een update plaatsvindt, wil je deze wijzigingen (misschien een statusupdate) in je spreadsheet loggen, gebruik de actie `Find sheet row` om de relevante rij voor die specifieke bestelling te vinden, en vervolgacties zoals `Update sheet row` of `Update sheet cell` maken het mogelijk om informatie te wijzigen - zoals de bestelstatus - in een andere kolom maar corresponderende rij.
Deze actie kan ook worden gekoppeld aan een beslissingspunt om te controleren of de unieke waarde al bestaat in de spreadsheet. Als de output null is, kun je een nieuwe invoer toevoegen; anders update je de bestaande.

![FindSheetRow](~/assets/docs/eggs/FindSheetRow.png)

Hetzelfde kan gedaan worden in Airtable. De onderstaande afbeelding toont een Bird die start wanneer een projectstatus is bijgewerkt in Bureau Works, vervolgens wordt de ID van het bijgewerkte project gebruikt als unieke identificator in een kolom en we krijgen de rijinformatie terug door de actie `Search record` te gebruiken. Daarna werken we de juiste cel bij met de nieuwe status voor het corresponderende project. Zo houd ik mijn projectinformatie up-to-date.

![AirtableSearchRecord](~/assets/docs/eggs/AirtableSearchRecord.png)

- Download Egg: <a href="https://docs.blackbird.io/downloads/Bureau_Works_to_Airtable.json" download>Airtable Search record</a>

### Itereren Door Spreadsheetrijen

Vaak vereisen workflows het verwerken van gegevens uit een spreadsheet door door de rijen te itereren, hetzij om gegevens te extraheren of om verwerking en updates uit te voeren. In Blackbird zijn er verschillende manieren waarop je door elke rij in het gebruikte bereik van een spreadsheet (of een subset) kunt lopen, gegevens uit meerdere kolommen kunt ophalen en nieuwe gegevens aan deze zelfde rijen kunt toevoegen.

#### Itereren Met een Gegenereerd Bereik:
Als je al weet welke rijen of subset van rijen je wilt verwerken, kun je een bereik genereren en daardoor itereren, waarbij je elk nummer in het bereik als rijnummer gebruikt.
1. Gebruik de actie `Generate range` in de Utilities-app en voer start- en eindnummers in. Bijv. het invoeren van 2 als start en 5 als einde zal [2,3,4,5] opleveren.
2. Voeg een lus toe om door het bereik te itereren, waarbij de lusuitvoer als het huidige rijnummer wordt gebruikt.
3. Gebruik binnen de lus de actie `Get sheet cell` om gegevens op te halen door het celadres samen te stellen (door de bekende kolom te combineren met het huidige rijnummer uit de lus).
4. Na het verwerken van de geëxtraheerde gegevens, gebruik je de actie `Update sheet cell` om je resultaat toe te voegen of de rij als verwerkt te markeren.

![Generate range](~/assets/docs/eggs/GenerateRange.png)

- Download Egg: <a href="https://docs.blackbird.io/downloads/excel_generate_range.json" download>Microsoft Excel Generate Range</a>

Op een zeer vergelijkbare manier, wanneer het aantal rijen in de spreadsheet onbekend is, kun je dynamisch het gebruikte bereik ophalen om het totale aantal rijen in de spreadsheet te krijgen.

1. Gebruik de actie `Get used range` om het totale aantal rijen op te halen.
2. Genereer een bereik op basis van de uitvoer van Row count of gebruik de uitvoer van Row IDs direct als invoer voor de lus.
3. Net als bij de vorige aanpak, loop je door de rijen, haal je gegevens op en verwerk je ze met `Get sheet cell`, en update of markeer je vervolgens elke rij via `Update sheet cell`.

> Merk op dat je 2 kunt invoeren als startrij voor je bereikgeneratie als je de spreadsheetheaders wilt overslaan.

![Generate range Google Sheets](~/assets/docs/eggs/GenerateRange2.png)

- Download Egg: <a href="https://docs.blackbird.io/downloads/google_sheets_generate_range.json" download>Google Sheets Generate Range</a>

#### Itereren Door Rijen Met Behulp van Arrays:
Als je meerdere waarden uit elke rij moet extraheren, kan het behandelen van elke rij als een array van celwaarden het proces vereenvoudigen. Deze aanpak is ook efficiënter omdat het minder API-aanroepen met zich meebrengt.

1. Gebruik `Get used range` of `Get range` om een set (of subset) van rijen op te halen als arrays van celwaarden.
2. Voeg een lus toe met de werkelijke uitvoer van Rows als invoer.
3. Gebruik de actie `Get entry by position` van de Utilities-app om specifieke kolomwaarden te extraheren op basis van hun positie in de array (bijv. positie 3 voor kolom C).
4. Nadat je de gegevens hebt verwerkt, kun je `Update sheet cell` gebruiken door het celadres samen te stellen (met Row ID uit de lus en het specificeren van de kolom)

![Iterate through range](~/assets/docs/eggs/IterateThroughRangeSheets.png)

Een andere variant, met gebruik van een subset en meerdere kolominvoeren als input voor andere acties:

![Iterate through range](~/assets/docs/eggs/IterateThroughRangeExcel.png)

- Download Egg: <a href="https://docs.blackbird.io/downloads/google_sheets_iterate_through_range.json" download>Google Sheets Iterate through Range</a>
- Download Egg: <a href="https://docs.blackbird.io/downloads/microsoft_excel_iterate_through_range.json.json" download>Microsoft Excel Generate Range</a>

### Kolomwaarden in Bulk Ophalen of Bijwerken
In sommige workflows kan het nodig zijn om bulk-updates te verwerken of meerdere waarden uit één kolom in een spreadsheet op te halen. Er zijn specifieke acties beschikbaar die tijd besparen door hele kolommen in één keer te verwerken, in plaats van rij voor rij.

#### Update Sheet Column
Wanneer je een lijst of array van waarden hebt (bijv. doeltaalcodes of bestandsnamen) die je in een spreadsheetkolom wilt invullen, maakt de actie `Update sheet column` het gemakkelijk. Deze actie kan één of meer arrays en/of een groep van enkele waarden als invoer nemen. Deze worden in de opgegeven kolom van de spreadsheet geschreven, de ene waarde onder de andere, beginnend in het opgegeven celadres en in dezelfde volgorde als ze in de invoer van de actie waren vermeld.

![Update Sheet Column](~/assets/docs/eggs/Update-sheet-column.png)

#### Get Sheet Column

Op dezelfde manier heb je misschien een set waarden nodig uit een specifieke kolom voor later gebruik. Gebruik de actie `Get column` om de kolom te specificeren (bijv. kolom C) en de begin- en eindcellen (bijv. 1 tot 10). De uitvoer zal een array zijn met de waarden uit het gespecificeerde kolombereik die je later kunt gebruiken als invoer voor de volgende stappen.

![Get column](~/assets/docs/eggs/GetColumn.png)

## Eggs importeren

Om een Egg in je Nest te importeren:

1. Navigeer naar de Bird Editor sectie.
2. Klik op Importeren rechtsboven.
3. Selecteer het Egg (JSON) bestand om te importeren en klik op `Import`.
4. Identificeer de nieuw aangemaakte Bird en klik erop om deze te bewerken.
5. Update de Verbindingsdetails en andere benodigde input/output parameters of gewenste stappen. Let op rode waarschuwingstekens naast de stapnaam die ontbrekende details in die stap signaleren.
6. Klik op Opslaan/Publiceren.

![Importing Eggs](~/assets/docs/eggs/ImportEggs.gif)