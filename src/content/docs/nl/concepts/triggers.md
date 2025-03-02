---
locale: nl
title: Triggers begrijpen - Processen en workflows starten
description: Leer wat triggers zijn.
sidebar:
  label: Triggers
  order: 4
---

Alle processen moeten ergens beginnen: een **trigger** definieert wanneer een workflow moet starten, zodat taken op het juiste moment en onder de juiste voorwaarden worden uitgevoerd. Binnen Blackbird zijn er vier soorten triggers: handmatig, gepland, op gebeurtenissen gebaseerd en polling. Elk type dient een uniek doel en is geschikt voor verschillende scenario's.

## Handmatige triggers

Handmatige triggers (ook wel [Manual push](../../guides/manual-triggers/) genoemd) worden geactiveerd door menselijk ingrijpen. Deze workflows starten zodra iemand op de knop `Fly` klikt. Dit type trigger is ideaal voor testen en debuggen, of wanneer processen moeten worden gestart op basis van specifieke, vaak onvoorspelbare, omstandigheden die menselijk oordeel vereisen. Dit is het aanbevolen triggertype terwijl je bezig bent met het bouwen van je Birds.

![Fly knop](~/assets/docs/triggers/Fly.gif)

**Belangrijkste kenmerken**:

**Menselijke initiatie**: Vereist dat een persoon het proces start.
**Flexibiliteit**: Biedt ruimte voor discretie en beoordeling bij het starten van processen.
**Gebruikssituaties**: Workflows testen, ad-hoc taakinitiatie.

## Geplande triggers

Geplande triggers zijn tijdgebaseerd en starten processen op vooraf gedefinieerde intervallen. Deze triggers zijn perfect voor taken die regelmatig en consistent moeten worden uitgevoerd, zoals dagelijkse data-backups of maandelijkse financiële rapporten. Door de initiatie van deze taken te automatiseren, zorgen geplande triggers ervoor dat processen stipt worden uitgevoerd zonder dat handmatige interventie nodig is.

In Blackbird kun je een interval kiezen—vanaf het moment dat de Bird wordt gepubliceerd, zal de Bird elke X aantal uren of minuten worden getriggerd. Een andere optie is om het proces dagelijks op een specifiek tijdstip te starten, of altijd op een bepaalde dag van de week/maand. Daarnaast kun je een tijdzone specificeren om verwarring te voorkomen.

![Gepland](~/assets/docs/triggers/Scheduled.gif)

**Belangrijkste kenmerken**:

**Tijdgebaseerd**: Start processen op specifieke tijden of intervallen.
**Consistentie**: Zorgt voor regelmatige en tijdige uitvoering van taken zonder menselijke tussenkomst.
**Gebruikssituaties**: Periodieke rapportage, routinematige gegevensverwerking, content uit mijn CMS halen elke maandag op de afgesproken deadline om deze voor vertaling te versturen.

## Gebeurtenistriggers

Gebeurtenisgebaseerde triggers reageren op specifieke veranderingen in een app door gebruik te maken van webhooks of callbacks. Deze triggers zijn zeer dynamisch en worden geactiveerd door gedefinieerde voorwaarden zoals de ontvangst van een nieuwe e-mail, het voltooien van een taak, of veranderingen in gegevens. Gebeurtenisgebaseerde triggers zijn essentieel voor realtime verwerking en responsieve workflows, waarbij het starten van processen onmiddellijk moet zijn en afhankelijk van specifieke gebeurtenissen.

Zodra je het Event-type selecteert, ga je naar het tabblad Verbinding of klik je op Doorgaan, kies je de app waarop je wilt reageren, en het specifieke type gebeurtenis (bijv. een taak die is voltooid in mijn TMS, een nieuwe e-mail in Outlook, een nieuwe bestelling aangemaakt in Plunet). Na publicatie van de Bird, zodra de geselecteerde actie plaatsvindt, zal je workflow reageren op de actie en beginnen met uitvoeren.

In de onderstaande afbeelding kunnen we ervoor kiezen om te reageren op verschillende gebeurtenissen die in Zendesk plaatsvinden, bijvoorbeeld wanneer er een nieuw artikel wordt gepubliceerd.

![Gebeurtenis](~/assets/docs/triggers/Event.png)

Als er extra instellingen nodig zijn (sommige apps vereisen dit), zie je mogelijk een URL die ergens moet worden gekopieerd en geplakt. In dergelijke scenario's worden details gespecificeerd in het gedeelte van de app binnen de Blackbird-documentatie.

**Belangrijkste kenmerken**:

**Gebeurtenisgestuurd**: Geactiveerd door specifieke systeemgebeurtenissen of veranderingen.
**Responsiviteit**: Maakt realtime reactie op gebeurtenissen mogelijk.
**Gebruikssituaties**: Realtime gegevensupdates, geautomatiseerde meldingen, voorwaardelijke taakuitvoering.

## Bucketing

Soms kan het reageren op elke afzonderlijke gebeurtenis rommelig worden als deze acties te vaak voorkomen. Hier komt Bucketing van pas. Je kunt je Bird zo aanpassen dat Blackbird deze gebeurtenissen verzamelt en pas start nadat ofwel X aantal acties hebben plaatsgevonden of een bepaalde tijd is verstreken. Voeg je instellingen toe aan het tabblad Bucketing hiervoor.

In de onderstaande afbeelding, volgend op het vorige voorbeeld, willen we niet elke keer een nieuw TMS-project aanmaken wanneer een artikel in Zendesk wordt gepubliceerd. In plaats daarvan wachten we tot er minstens vijf artikelen zijn gepubliceerd of twee uur is verstreken, wat het eerst gebeurt. Als na twee uur slechts drie artikelen werden gepubliceerd, zal de Bird toch worden uitgevoerd en een nieuw TMS-project voor die drie artikelen aanmaken. Deze aanpassing zorgt ervoor dat processen voldoende responsief zijn zonder overmatige ruis te creëren.

![Bucketing](~/assets/docs/triggers/Bucketing.png)

## Polling

Aangezien sommige systemen geen webhooks of callbacks hebben, maar we toch alert en reactief willen zijn, heeft Blackbird Polling-events geïntroduceerd. Voor de gewone gebruiker ziet deze trigger er precies hetzelfde uit als een gebeurtenisgebaseerde trigger, terwijl Blackbird onder de motorkap op opgegeven intervallen controleert op wijzigingen. Dit type geplande trigger zoekt naar updates in de gegevens van een app om te beslissen of een workflow moet worden gestart, waardoor de kloof wordt overbrugd voor apps die geen webhooks bieden door onze Birds in _realtime_ te laten reageren.

![Polling](~/assets/docs/triggers/Polling.gif)

## Checkpoints

Deze innovatieve functie maakt in-Bird triggers mogelijk, waardoor je Bird kan wachten op een specifieke gebeurtenis voordat er wordt verdergegaan met de volgende stappen. Meer informatie over Checkpoints vind je in een speciaal artikel [hier](../../concepts/checkpoints/).