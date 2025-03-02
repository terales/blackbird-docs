---
locale: nl
title: Blackbird App
description: Een Egg met het potentieel om monitoringsvogels te creëren die alles bijhouden wat er in uw Blackbird-instantie gebeurt
sidebar:
  label: Blackbird app
  order: 5
  hidden: false
---

## Eggs: Startpunten voor uw Birds

In Blackbird zijn Eggs de zaden of blauwdrukken voor uw workflows. Ze vertegenwoordigen de initiële ideeën die het potentieel hebben om volwaardige Birds te worden.

In deze Egg-gids verkennen we enkele opties om te monitoren en meldingen te ontvangen wanneer er iets gebeurt in uw Blackbird-instantie op een gecentraliseerde manier. Vind **Downloadbare Eggs** na elk gebruiksgeval.

## Blijf op de hoogte met de Blackbird App

Met zoveel Nests, Birds, gebruikers en Flights in actie, is het gemakkelijk om het overzicht over de zwerm te verliezen. Blackbird is ontworpen om stilletjes op de achtergrond te werken, uw workflows te automatiseren zonder dat constante controles nodig zijn. Maar wat gebeurt er als een Bird wordt opgeschort, een gebruiker zich aansluit bij of een Nest verlaat, of een Flight neerstort? Daar komt de Blackbird app om de hoek kijken! Beschouw het als uw betrouwbare uitkijktoren die alle activiteiten in uw Blackbird-instantie in de gaten houdt. Of het nu gaat om updates in een spreadsheet vast te leggen of meldingen rechtstreeks naar Slack, Teams of Outlook te sturen, de Blackbird app zorgt ervoor dat u nooit iets mist - of een tweet.

## Gebruikssituaties

### Foutmelding of -tracking

Het meest populaire gebruiksgeval voor de Blackbird app in Blackbird is het monitoren van mislukte Flights. U kunt realtime meldingen ontvangen met belangrijke details zoals de foutmelding, Nest-naam, Bird-naam, Flight-ID en startdatum. Als alternatief kunt u deze mislukte Flights in een spreadsheet loggen voor latere beoordeling of om dashboards te vullen.

> Gebruik optionele invoer om een specifieke Nest te monitoren, anders zal een enkele Bird alle Nests binnen uw Blackbird-instantie monitoren.

![Egg](~/assets/docs/eggs/BBApp1.png)
Error escalation Bird

- Download Egg: <a href="https://docs.blackbird.io/downloads/Report_failed_Flights_on_Slack.json" download>Report failed Flights on Slack</a>
- Download Egg: <a href="https://docs.blackbird.io/downloads/Report_failed_Flights_on_Teams.json" download>Report failed Flights on Teams</a>
- Download Egg: <a href="https://docs.blackbird.io/downloads/Report_failed_Flights_via_Outlook_email.json" download>Report failed Flights via Outlook email</a>
- Download Egg: <a href="https://docs.blackbird.io/downloads/Report_failed_Flights_via_Gmail.json" download>Report failed Flights via Gmail</a>

![Egg](~/assets/docs/eggs/BBApp2.png)
Error logging Bird

- Download Egg: <a href="https://docs.blackbird.io/downloads/Log_failed_Flights_on_Google_Sheets.json" download>Log failed Flights on Google Sheets</a>
- Download Egg: <a href="https://docs.blackbird.io/downloads/Log_failed_Flights_on_Microsoft_Excel.json" download>Log failed Flights on Microsoft Excel</a>

### Gebruikers toegevoegd of verwijderd

Monitor gebruikers die zijn toegevoegd aan of verwijderd uit een specifieke Nest.

![Egg](~/assets/docs/eggs/BBApp3.png)

- Download Egg: <a href="https://docs.blackbird.io/downloads/On_user_removed_send_Slack_message.json" download>On user removed send Slack message</a>

### Birds opgeschort of geactiveerd

Ontvang meldingen wanneer Birds worden opgeschort of geactiveerd: krijg realtime meldingen van wijzigingen in uw Production Nest.

![Egg](~/assets/docs/eggs/BBApp4.png)

> Gebruik optionele invoer om een specifieke Nest te monitoren, anders zal een enkele Bird alle Nests binnen uw Blackbird-instantie monitoren.

- Download Egg: <a href="https://docs.blackbird.io/downloads/On_Bird_activated_send_Slack_message.json" download>On Bird activated send Slack message</a>

## Importeren van Eggs

Om een Egg in uw Nest te importeren:

1. Navigeer naar de Bird Editor-sectie.
2. Klik op Import rechtsboven.
3. Selecteer het Egg (JSON) bestand om te importeren en klik op `Import`.
4. Identificeer de nieuw aangemaakte Bird en klik erop om te bewerken.
5. Voeg verbindingsdetails toe en eventuele andere benodigde inputparameters of gewenste stappen. Let op rode waarschuwingstekens naast de stapnaam die ontbrekende details in die stap aangeven.
6. Klik op de drie puntjes naast de naam van de Bird en update de apps als er updates beschikbaar zijn.
7. Klik op Opslaan/Publiceren.

![Importing Eggs](~/assets/docs/eggs/ImportEggs.gif)