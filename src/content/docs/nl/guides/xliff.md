---
title: Werken Met XLIFF
description: XLIFF is een hoeksteen van vertaalautomatisering, in deze gids laten we enkele voorbeelden zien van hoe je XLIFF kunt gebruiken in Blackbird.
sidebar:
  label: Werken Met XLIFF
  order: 4
  hidden: false
---

XLIFF (XML Localization Interchange File Format) is het baken van standaardisatie in de taal- en lokalisatie-industrie, waardoor vertaalgegevens naadloos kunnen worden uitgewisseld. Het organiseert inhoud in vertalingseenheden, elk bestaande uit een bronsegment en de bijbehorende doelvertaling.

![Image of XLIFF](~/assets/guides/xliff/ImageOfXliff.png)

Hoewel de meeste Translation Management Systems (TMS) en Computer-Assisted Translation (CAT) tools moeiteloos met XLIFF-bestanden kunnen werken, zijn sommige andere tools mogelijk minder bestandsvriendelijk. In de wereld van Blackbird, waar interoperabiliteit van het grootste belang is, hebben we echter nieuwe vleugels—eh, acties—ontvouwd om XLIFFs zelfs in niet-bestandsvriendelijke apps te laten vliegen.

### Wat is er nieuw?

In onze nieuwste release hebben we nieuwe acties geïntroduceerd waarmee XLIFF-bestanden soepel kunnen worden gebruikt in apps zoals OpenAI, DeepL, ModernMT, Anthropic, TAUS en ModelFront, die normaal gesproken de voorkeur geven aan tekst boven bestanden.

### Waarom XLIFF kiezen?

Waarom niet? Het is de universele taal van lokalisatie! Bovendien is het converteren tussen verschillende bestandsformaten en XLIFF nog nooit zo eenvoudig geweest met onze nieuw geïntegreerde apps, Okapi & Matecat filters. Dit betekent dat je verzameling apps nu samen kunnen werken in een harmonieuze vlucht, waardoor de mogelijkheden van wat mogelijk is met Blackbird worden uitgebreid.

## Bestandsconversie-apps

### Okapi

Met het [Okapi](https://docs.blackbird.io/apps/okapi/)-framework aan boord is het converteren van bestanden naar en van XLIFF een fluitje van een cent. Onze twee nieuwe acties, "Convert file to XLIFF" en zijn betrouwbare tegenhanger "Convert XLIFF to file", maken de weg vrij voor naadloze bestandsformaatconversies. Bekijk de ondersteunde bestandstypen voor deze acties [hier](https://www.okapiframework.org/wiki/index.php?title=Filters) en laat je bestanden hun vleugels uitslaan.

### Matecat filters

Een andere krachtige app om te converteren naar en van XLIFF is [Matecat filters](https://docs.blackbird.io/apps/matecatfilters/), omdat het je in staat stelt alle vertaalbare inhoud uit elk ondersteund bestandsformaat te extraheren naar een handig XLIFF-bestand. Zodra de XLIFF is vertaald, kun je filters opnieuw gebruiken om je bestand in de doeltaal terug te krijgen met perfect behouden opmaak.

## LLMs

### OpenAI

Wij introduceren onze geavanceerde acties voor XLIFF-bestandsverwerking! Blackbird biedt drie handige acties om de kracht van AI te benutten voor het verbeteren van je vertaalwerkstroom:

- Process XLIFF File: Deze actie neemt een XLIFF-bestand als invoer en ontleedt zorgvuldig alle bronsegmenten. Je kunt specifieke instructies geven via de `Prompt`-invoer, of [OpenAI](https://docs.blackbird.io/apps/openai/) standaard laten vertalen. De resultaten worden naadloos ingevoegd in de doelsegmenten, wat zorgt voor een volledig gelokaliseerd XLIFF-bestand als uitvoer. Woordenlijstondersteuning is beschikbaar om terminologieconsistentie te behouden.
- Post-edit XLIFF: Deze actie gaat een stap verder door zowel de bron- als doelsegmenten te verwerken. Het verfijnt de bestaande vertalingen en maakt noodzakelijke bewerkingen om de algehele kwaliteit te verbeteren. Met de mogelijkheid om woordenlijsten op te nemen, zorgt het ervoor dat je vertalingen niet alleen nauwkeurig zijn, maar ook consistent met je voorkeursterminologie.
- Get Quality Scores for XLIFF file: Deze actie evalueert de kwaliteit van je vertalingen, kent een score toe aan elke vertaaleenheid en een algemene score op bestandsniveau. Vind meer details over deze actie [hier](https://docs.blackbird.io/apps/openai/#xliff-operations).

### Anthropic

Vergelijkbare acties zijn toegevoegd aan [Anthropic](https://docs.blackbird.io/apps/anthropic/#xliff-actions) zodat je kunt experimenteren met het model van je keuze.
Acties:

- Process XLIFF
- Post-edit XLIFF file
- Get Quality Scores for XLIFF file

## Machinevertaling

### DeepL

Hoewel [DeepL](https://docs.blackbird.io/apps/deepl/) verschillende [bestandstypen](https://developers.deepl.com/docs/api-reference/document) ondersteunt, wordt alleen versie 2.1 geaccepteerd als het gaat om XLIFF-bestanden. We hebben nu meer magie achter de schermen toegevoegd om deze kloof te overbruggen, zodat je je 1.2 XLIFF-bestanden kunt laten vertalen via DeepL, evenals elk ander bestand dat eerder is geconverteerd naar XLIFF 1.2 via onze Okapi- of Matecat filters-acties.

### ModernMT

Onze [ModernMT](https://docs.blackbird.io/apps/modernmt/)-app is ook aangepast zodat XLIFF-bestanden kunnen worden verwerkt, hetzij om hele bestanden te vertalen, hetzij om een kwaliteitsschatting te krijgen. Bestanden afkomstig van Okapi of Matecat filters worden feilloos verwerkt.

## Kwaliteitsschatting Apps ([TAUS](https://docs.blackbird.io/apps/taus/), ModernMT, OpenAI, Anthropic & [ModelFront](https://docs.blackbird.io/apps/modelfront/))

Onze nieuwste Blackbird-acties bieden een vogelperspectief op de kwaliteit van je XLIFF. Door de kwaliteitsscore van elk segment binnen de XLIFF te berekenen en een geaggregeerd cijfer terug te geven dat ons een idee geeft van de algehele kwaliteit in het bestand. Dit was voorheen alleen voorbehouden aan afzonderlijke segmenten. Bovendien worden alle vertaaleenheden aangevuld met hun individuele score die wordt toegevoegd aan het extradata-attribuut in het XLIFF-bestand.

![Average Scores as output](~/assets/guides/xliff/AverageScore.png)

![Image of extradata and scores](~/assets/guides/xliff/Imageofextradataandscores.png)

Optioneel kunnen de inputparameters Threshold, New Target State en Condition worden ingesteld voor de Blackbird-actie om de doelstaat-waarde van segmenten die aan de gewenste criteria voldoen te wijzigen. Dit betekent dat je correct vertaalde segmenten kunt markeren en blokkeren bij het importeren van het XLIFF-bestand in een TMS voor menselijke revisie, waardoor tijd en geld worden bespaard en inspanningen worden gericht op die segmenten die daadwerkelijk bewerking nodig hebben.

Voorbeeld

Het instellen van de optionele invoerwaarden zoals weergegeven in de onderstaande afbeelding zal ertoe leiden dat alle segmenten met een score boven 0,9 hun doelstaat-waarden bijgewerkt krijgen naar "final". Bij het importeren van deze XLIFF-bestanden in TMS-tools kan meestal een instelling worden toegevoegd om segmenten met een specifieke doelwaarde ("final" in dit geval) te vergrendelen, zodat vertalers zich alleen kunnen concentreren op en bewerken van de segmenten van lagere kwaliteit.

![Optional Input](~/assets/guides/xliff/optionalinput.png)

![Updated Target State](~/assets/guides/xliff/UpdatedTargetState.png)

## Aanschouw, een majestueuze vogel in actie!

Hoewel de nieuwe acties op zichzelf al grote waarde toevoegen en nieuwe mogelijkheden mogelijk maken, worden ze nog krachtiger wanneer ze worden gekoppeld. Hieronder staat een voorbeeld van een bird die een .docx-bestand als invoer neemt, het bestand wordt vervolgens geconverteerd naar XLIFF voor interoperabiliteitsdoeleinden, OpenAI wordt vervolgens gebruikt om het bestand naar de doeltaal te vertalen. Daarna wordt TAUS gebruikt om de kwaliteit van genoemde vertalingen te bepalen en een beslissingsoperator wordt gebruikt om de volgende stappen voor het bestand te definiëren: als de gemiddelde kwaliteitsscore boven de gedefinieerde drempel van 0,95 ligt, wordt de XLIFF geconverteerd naar een vertaalde .docx en geleverd als definitief. Anders, als de gemiddelde score onder 0,95 ligt, wordt het bestand geïmporteerd in een TMS voor verdere menselijke bewerking. Dit zorgt ervoor dat alleen bestanden die daadwerkelijk een mens in de lus nodig hebben, worden geüpload naar de TMS, terwijl kwaliteitsvertalingen onmiddellijk worden teruggeleverd.

![screenshot of bird](~/assets/guides/xliff/XliffSampleBird.png)