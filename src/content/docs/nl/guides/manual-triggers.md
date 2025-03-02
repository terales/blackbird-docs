---
title: Manuele Push Gebruik
description: Verschillende gebruikssituaties waarbij het handmatig activeren van je Birds volkomen logisch is
sidebar:
  label: Manual Push
  order: 10
  hidden: false
---

Handmatige triggers (ook wel Manual push genoemd) bieden een krachtige oplossing voor workflows die flexibiliteit en menselijke tussenkomst vereisen. In tegenstelling tot geautomatiseerde processen kunnen gebruikers met handmatige triggers een workflow precies wanneer nodig starten door op de Fly-knop te klikken. Deze functie is bijzonder nuttig voor elke gebruiker die taken moet starten op basis van specifieke voorwaarden of menselijk oordeel. Of het nu gaat om het testen van nieuwe Birds, het debuggen van workflows, of het afhandelen van eenmalige projecten, handmatige triggers geven je controle over de timing en het starten van processen, zodat taken beginnen wanneer jij er klaar voor bent.

![Fly button](../../../../assets/docs/triggers/Fly.gif)

Een belangrijk voordeel van handmatige triggers is de flexibiliteit die ze bieden. In plaats van gebonden te zijn aan rigide, geplande workflows of te wachten op een gebeurtenis waarop gereageerd moet worden, kun je processen op aanvraag activeren. Dit maakt ze ideaal voor situaties waarin onvoorspelbare omstandigheden menselijk inzicht vereisen. Hierdoor zijn handmatige triggers de perfecte keuze tijdens de ontwikkelingsfase van een workflow. Terwijl je je Birds bouwt en verfijnt, kun je door handmatige activering verschillende elementen testen zonder te wachten op een geplande of gebeurtenisgestuurde trigger, wat real-time feedback geeft en helpt een soepel proces te garanderen voordat volledige automatisering wordt toegepast.

Handmatige triggers blinken ook uit in het domein van lokalisatie en contentverwerking. Als voorbeeld, wanneer een taaldienstverlener een nieuwe klant of project aanneemt, is er vaak behoefte om veel bestaande of vooraf geselecteerde content eenmalig te vertalen of te verwerken. Handmatige triggers stellen je in staat om de nodige filters in te stellen in de app waaruit de content afkomstig is, zoals datumbereiken of contentcategorieën, en vervolgens met één klik deze content te extraheren en naar je platform of TMS te sturen. Dit zorgt voor een naadloos, efficiënt proces voordat wordt overgegaan op continue lokalisatiediensten.

### Example

![Sitecore](../../../../assets/docs/triggers/Sitecore_DownloadItems.png)

De bovenstaande afbeelding toont een Bird die een grote groep Sitecore-pagina's die aan specifieke criteria voldoen naar een TMS (in dit geval Trados) verplaatst. Zodra de gebruiker op de Fly-knop klikt — de handmatige trigger — begint de workflow. De Bird zoekt naar alle pagina's in Sitecore die na 1 januari 2024 zijn gemaakt en gepubliceerd zijn. De optionele invoerfilters zijn gebruikt om de zoekcriteria aan te passen, waardoor ze gemakkelijk kunnen worden bijgesteld wanneer nodig. Deze filters helpen bij het identificeren van welke pagina's gedownload moeten worden. De volgende stappen in de workflow maken een project aan in Trados, halen de Sitecore-pagina's op als HTML-bestanden, downloaden ze en uploaden ze naar het nieuw aangemaakte Trados-project als broninhoud voor vertaling. Deze workflow kan zo vaak als nodig worden uitgevoerd door op de Fly-knop te klikken, hoewel één uitvoering voldoende zou moeten zijn om alle benodigde content voor vertaling op te halen en naar de gewenste TMS te sturen.

> Zie meer informatie over triggers [hier](https://docs.blackbird.io/concepts/triggers/).