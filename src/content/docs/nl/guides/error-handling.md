---
locale: nl
title: Omgaan met fouten
description: Effectieve foutafhandeling kan een cruciaal onderdeel zijn van elke workflow-orchestrator. Blackbird biedt verschillende manieren om fouten te beheren wanneer ze optreden. Deze gids leidt je door de drie belangrijkste aspecten van foutafhandeling in Blackbird.
sidebar:
  label: Omgaan met fouten
  order: 7
  hidden: false
---

Effectieve foutafhandeling kan een cruciaal onderdeel zijn van elke workflow-orchestrator. Blackbird biedt verschillende manieren om fouten te beheren wanneer ze optreden. Deze gids leidt je door de drie belangrijkste aspecten van foutafhandeling in Blackbird: Het instellen van een herhalingsbeleid, gebruikers toestaan om acties over te slaan als er een fout optreedt, en een vogel laten vliegen wanneer een andere vogel een fout geeft (een functie die momenteel nog niet beschikbaar is).

## Herhalingsbeleid

Hoe een workflow omgaat met fouten kan een grote impact hebben op de algemene prestaties. Het opnieuw proberen van acties die zijn mislukt door tijdelijke problemen kan vaak helpen om een workflow te voltooien die anders vast zou kunnen lopen.

Om een herhalingsbeleid in te stellen in Blackbird:

1. Navigeer vanuit een actie naar het tabblad '_Error handling_'.
2. Definieer het maximale aantal herhalingen in het veld '_Number of retries_'.
3. Specificeer het herhalingsinterval in het veld '_Frequency (Seconds)_'.

![Retry policy](~/assets/guides/errors/retry.png)

De vogel zal nu proberen de actie opnieuw uit te voeren met het aangegeven aantal keren op het gespecificeerde interval als er een fout optreedt.

### Wanneer een herhalingsbeleid gebruiken

Men zou kunnen denken dat het verstandig is om een herhalingsbeleid toe te passen op elke actie in hun vogel "voor het geval dat". Dit is helaas niet het geval vanwege de volgende redenen:

- Een herhalingsbeleid kan extra API-gebruikskosten met zich meebrengen.
- Een goed gebouwde app zou onder de motorkap al moeten zorgen voor herhalingen in veelvoorkomende scenario's zoals snelheidslimieten.
- Het herhalen van een actie met neveneffecten kan logische problemen veroorzaken in de systemen waarmee je verbinding maakt. Als de actie bijvoorbeeld een nieuw project in een systeem aanmaakt, kunnen er plotseling meerdere projecten worden aangemaakt omdat de onderliggende fout optrad nadat de projectcreatie was verwerkt. In technische termen moet men rekening houden met _idempotentie_.

Dit laat ons nog steeds met de vraag wanneer je de herhalingsbeleidsfeature zou moeten gebruiken. Als algemene vuistregel wordt aanbevolen om een herhalingsbeleid toe te voegen wanneer kan worden aangenomen dat het systeem waarmee je verbinding maakt in bepaalde scenario's instabiel kan zijn, en wanneer je uit het testen van je vogel concludeert dat het toevoegen van een herhalingsbeleid het werk van het beheren van deze vogel minder omslachtig zou maken.

Dus het toevoegen van een herhalingsbeleid aan een actie die soms mislukt vanwege een overbelaste server, terwijl de actie zelf geen nieuwe entiteiten in dit systeem genereert, is een goede praktijk. Het toevoegen van een herhalingsbeleid aan een actie die kan mislukken omdat een gebruiker een bepaalde waarde verkeerd heeft geconfigureerd, wordt niet aanbevolen, aangezien het herhalen van de actie nooit goede resultaten zal opleveren en het in dit geval vaak beter is om eerder dan later op de hoogte te worden gesteld.

## Een actie overslaan bij een fout

Er kunnen gevallen zijn waarin een fout kan optreden, en je wilt dat de workflow toch doorgaat, ongeacht de fout. In deze situaties kun je de mislukte actie overslaan en doorgaan met de rest van je workflow.

Om dit mogelijk te maken:

1. Zoek de gewenste actie in je workflow en ga naar het tabblad '_Error Handling_'.
2. Zet '_Enable Skip Action_' aan.

![Skip](~/assets/guides/errors/skip.png)

Als deze specifieke actie nu een fout geeft, wordt deze overgeslagen, zodat de workflow kan doorgaan.

> **💡 Opmerking**: Wanneer je de mogelijkheid tot het overslaan van een actie inschakelt, kunnen de uitvoerwaarden van deze actie nergens anders in de vogel worden gebruikt.

### Wanneer een actie overslaan bij een fout

De mogelijkheid om een actie over te slaan is perfect ontworpen voor niet-essentiële workflow-stappen. Bijvoorbeeld stappen die niet vitaal zijn voor de correcte uitvoering van je workflow, zoals loggen, notificaties, statusupdates, etc. Het is aan de gebruiker om te beslissen welke acties niet-kritisch zijn en kunnen worden overgeslagen.

## Foutafhandeling

Zelfs met herhalingsbeleid en het overslaan van acties is het nog steeds mogelijk dat dingen mislukken. Trouw aan de Blackbird-filosofie wilden we je in staat stellen om volledig aan te passen wat er zou gebeuren bij een mislukte vlucht. Daarom kun je de Blackbird-app gebruiken om vogels te maken die triggeren op mislukte vluchten, zodat je precies kunt definiëren wat je wilt doen. Omdat je volledige vrijheid hebt, kun je bijvoorbeeld kiezen om jezelf een bericht te sturen via Slack, een Jira-ticket aan te maken (of een ander taakbeheerprogramma te gebruiken), een e-mail te versturen, te loggen naar een database, of zelfs een combinatie van deze! Misschien wil je zelfs enkele wijzigingen ongedaan maken.

![1721141187211](https://raw.githubusercontent.com/bb-io/Blackbird/main/image/README/1721141187211.png)

Deze ongelooflijk eenvoudige vogel stuurt een melding in Slack wanneer een vlucht mislukt. Dit kan nuttig zijn om mensen te waarschuwen voor mogelijke problemen. Een alternatieve of aanvullende actie naast Slack zou het loggen van een ticket in bijvoorbeeld Jira kunnen zijn.

Je kunt meer lezen over het opzetten van foutafhandelingsvogels op de [Blackbird app-pagina](../../apps/blackbird/)

## Slotopmerkingen

Omgaan met fouten is een belangrijk aspect van elk workflowontwerp. Bij Blackbird zetten we ons in om je de tools te bieden die je nodig hebt om je workflows efficiënt te beheren, zelfs wanneer er iets misgaat. Houd deze gids in de gaten voor toekomstige updates terwijl we ons platform blijven verbeteren. Zoals altijd, als je hulp nodig hebt of vragen hebt, neem dan contact op met het ondersteuningsteam.