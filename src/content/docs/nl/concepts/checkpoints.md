---
title: Checkpoints
description: Introductie van Checkpoints
sidebar:
  label: Checkpoints
  order: 6
  hidden: false
---

Blackbird.io heeft een krachtige nieuwe functie uitgebracht genaamd Checkpoints, ontworpen om werkstroomautomatisering te verbeteren met de mogelijkheid om meerdere triggers te beheren en menselijke tussenkomst op belangrijke punten mogelijk te maken. Deze handleiding legt uit hoe Checkpoints werken, wat de voordelen zijn en hoe u ze kunt gebruiken voor meer efficiëntie en controle in uw workflows.

## Wat zijn Checkpoints?

Checkpoints in Blackbird.io workflows zijn _controlestappen_ die Birds in staat stellen om te **pauzeren en wachten** op verschillende gebeurtenissen voordat ze hun Flights voortzetten. Deze triggers kunnen een mix zijn van geautomatiseerde en door mensen aangestuurde acties. In plaats van één lineair triggerpad te volgen, maken Checkpoints flexibele afhandeling van workflows mogelijk waar pauzes voor goedkeuringen, beoordelingen of externe gebeurtenissen noodzakelijk zijn.

![Shopify to Phrase](~/assets/guides/checkpoints/ShopifyToPhrase.png)

Traditionele workflows volgen doorgaans één keten van gebeurtenissen, geactiveerd door één initiële actie (bijv. een bestand dat wordt geüpload of een taak die wordt toegewezen). Met Checkpoints worden meerdere triggerpunten ingebed in een Bird, waardoor pauzes en controles onderweg mogelijk zijn. Dit creëert meer aanpasbare processen, vooral nuttig wanneer bepaalde stappen menselijke betrokkenheid vereisen of moeten wachten tot externe systemen reageren of langlopende taken worden voltooid. Bijvoorbeeld, na het verzenden van een document voor vertaling moeten we wachten tot de vertaling klaar is voordat we het kunnen publiceren. **Deze functie verandert complexe multi-Bird workflows in één uitgebreide Bird**.

![MarketoToPlunet](~/assets/guides/checkpoints/MarketoToPlunet.png)

## Welke voordelen bieden Checkpoints?

**Belangrijkste voordelen**:

1. **Workflows sluiten beter aan bij mentale processen**. Eén Bird omvat een volledige workflow.
2. **Verhoogde Bird-efficiëntie**. Eén Bird kan een proces vervangen dat in meerdere Birds moest worden opgesplitst.
3. **Geen noodzaak voor Entity-koppelingen of aangepaste velden** om dezelfde entiteiten tussen Birds te koppelen. Omdat het volledige proces in één Bird wordt beschreven, wordt informatie naadloos doorgegeven vanuit eerdere stappen.

## Hoe voeg ik een Checkpoint toe aan mijn Bird?

Klik op het plusteken zoals u zou doen om een andere stap toe te voegen en selecteer `Checkpoint`. Kies tussen wachten op een `Event` in een app of een specifieke hoeveelheid tijd (`Delay`). Als u hebt gekozen om op een gebeurtenis te wachten, moet u op doorgaan klikken of naar het tabblad `Connection` gaan, vervolgens de app, het type gebeurtenis, uw verbinding en de ID voor het exacte object dat u wilt monitoren selecteren — als u wacht tot een project is voltooid, kunt u de project-ID specificeren zodat uw Flight alleen doorgaat zodra dit specifieke project is voltooid. Als in plaats daarvan de optie Delay is geselecteerd, moet u de wachttijd specificeren in het tabblad `Duration`.

![Adding a checkpoint GIF](~/assets/guides/checkpoints/AddingCheckpoint.gif)

## Voorbeelden

### Translation Management Systems (TMS)
Voor bedrijven die TMS-tools gebruiken (zoals Phrase of RWS WorldServer, etc.), moeten vertaaltaken meestal door een mens worden uitgevoerd. Checkpoints laten workflows stoppen totdat vertalingen zijn beoordeeld of voltooid.

![MemoQ wordpress with checkpoints](~/assets/guides/checkpoints/wordpress_memoq.png)

De bovenstaande afbeelding toont een Bird die nieuwe berichten van Wordpress neemt, een project in memoQ aanmaakt, de berichten als HTML-brondocumenten importeert in het nieuw aangemaakte memoQ-project, wacht tot de projectstatus in memoQ "Wrapped up" is, vervolgens de vertaalde documenten downloadt en uploadt naar Wordpress.

### Menselijke goedkeuringen in projectmanagement
Op platforms zoals Asana, Jira of Trello vereisen bepaalde taken goedkeuring voordat ze verder kunnen gaan. Met Checkpoints kunnen workflows pauzeren totdat de nodige beoordeling of goedkeuring is voltooid. Dit zorgt ervoor dat niets wordt gemist en goedkeuringen soepel in het proces worden geïntegreerd.

![Jira](~/assets/guides/checkpoints/Jira.png)

De bovenstaande afbeelding toont een Bird met twee Checkpoints. De flow start wanneer een nieuw Zendesk-artikel wordt gepubliceerd, de inhoud van het nieuwe artikel wordt geëxtraheerd als HTML en toegevoegd als bronbestand in een nieuw aangemaakt Trados-project. Op dit punt wordt het proces gepauzeerd en zodra het project is bijgewerkt en de gewenste status heeft bereikt, wordt het doelbestand gedownload en toegevoegd als bijlage aan een nieuwe Jira-issue. Een nieuwe stop wordt bereikt omdat de flow wacht tot de status van de Jira-issue wordt gewijzigd, wat menselijke tussenkomst mogelijk maakt — misschien moet een juridisch of marketingteam de vertaling beoordelen. Daarna wordt een beslissingspunt bereikt: als de nieuwe status "Approved" is, wordt het vertaalde Zendesk-artikel gepubliceerd. Anders wordt het bijbehorende Teams-kanaal op de hoogte gebracht.

### Large Language Models (LLMs) & Batch-verwerking
Bij het gebruik van LLM-diensten zoals [OpenAI's Batch API](https://docs.blackbird.io/apps/openai/#batch-processing) voor contentgeneratie of gegevensverwerking (vooral langlopende taken), kan een Checkpoint de workflow pauzeren totdat de LLM een resultaat retourneert of een batchproces voltooit. Als verdere menselijke validatie nodig is, kan de workflow wachten op die input voordat naar de volgende fase wordt overgegaan.

![Open AI batch](~/assets/guides/checkpoints/OpenAICheckpoint.png)

De bovenstaande afbeelding toont een Bird waarbij tweetalige bestanden worden geëxporteerd uit Phrase zodra taken een specifieke status bereiken, vervolgens worden deze bestanden verwerkt via OpenAI Batch API. De workflow komt tot stilstand totdat de Batch-verwerking is voltooid en zodra dit gebeurt, worden de resulterende bestanden weer geüpload naar Phrase.