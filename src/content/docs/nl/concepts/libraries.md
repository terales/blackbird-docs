---
title: Libraries
description: Leer hoe je voorgedefinieerde gegevens kunt toewijzen en gebruiken tijdens je Flights
sidebar:
  label: Libraries
  order: 5
  hidden: false
---

## Wat is een Library?

In de context van workflows en gegevensbeheer is een "Library" een gestructureerde matrix of tabel die wordt gebruikt om verschillende soorten informatie in kaart te brengen en te beheren. Het dient als een referentie waarmee je eenvoudig het ene stuk informatie kunt omzetten naar een ander op basis van vooraf gedefinieerde toewijzingen. Libraries zijn vooral nuttig voor het organiseren en benaderen van vooraf bepaalde gegevens die essentieel zijn voor je workflow.

Vergelijkbaar met een tabel bevatten libraries rijen en kolommen, waarbij elke rij een unieke invoer vertegenwoordigt en elke kolom een attribuut of stuk informatie gerelateerd aan die invoer.

Libraries worden gebruikt om:
- **Gegevens te organiseren**: Vooraf gedefinieerde informatie opslaan in een gestructureerd formaat.
- **Workflows te vereenvoudigen**: Snel opzoeken en converteren van gegevens op basis van vooraf gedefinieerde toewijzingen mogelijk maken.
- **Interoperabiliteit te waarborgen**: De output van het ene hulpmiddel direct omzetten naar de input van een ander hulpmiddel.

## De Languages Library

In Blackbird is er een speciaal tabblad voor Libraries (navigatiebalk rechtsboven). Het standaard gebruiksgeval is voor taalcodes: hoewel er standaarden bestaan, gebruikt elke app een andere code om naar dezelfde taal te verwijzen. Daarom gebruiken we de standaard library om verschillende codevarianten op te slaan die verwijzen naar dezelfde taal in verschillende apps.

![Library Tab and Default Library](../../../../assets/docs/libraries/LibrariesTab.gif)

Binnen je workflow (Bird) kun je verwijzen naar de library door de Convert-operator te gebruiken. Klik op het plus-teken, alsof je een actie toevoegt, maar selecteer Operator in plaats daarvan. Kies vervolgens `Convert`, de te gebruiken library, en de gegevensdelen die je wilt converteren van en naar. Zodra je Bird vliegt (_workflow draait_), worden gegevens getransformeerd en dienovereenkomstig doorgestuurd.

<!-- ![Convert Operator](../../../../assets/docs/libraries/Convert.gif) -->

Hier is een voorbeeld waarbij de output van het ene hulpmiddel de input van het volgende wordt, en daartussenin volgt de Convert-operator de regels in de library om ervoor te zorgen dat alles soepel werkt op het gebied van interoperabiliteit, zelfs wanneer de twee hulpmiddelen verschillende standaarden gebruiken om naar talen te verwijzen. In dit geval krijgen we de lijst met talen waarvoor een vertaling ontbreekt voor een bepaald artikel in Zendesk en we willen de artikelen vertalen naar deze talen via DeepL. We weten echter dat DeepL een andere code gebruikt om naar dezelfde talen te verwijzen. Daarom stellen we deze codes eenmalig in onze library in, voegen we de Convert-operator toe als onderdeel van onze workflow, en hebben we nu een volledig functionele Bird die niet zal worden onderbroken omdat twee apps _niet dezelfde taal spreken_.

![Example Bird](../../../../assets/docs/libraries/SampleBird.png)

Hoewel de standaard Library alleen-lezen is, kun je ook je eigen aangepaste libraries maken.

## Aangepaste Libraries

Terwijl je kunt profiteren van het gebruik van de Languages library, kun je ook een (of meerdere) libraries maken om informatie toe te wijzen die voor jou en je processen zinvol is. Bijvoorbeeld een toewijzing van inhoudstypen, de projectsjabloon die voor elk inhoudstype moet worden gebruikt, en elke kwaliteitsscore-drempel. Op deze manier kun je inhoud dynamisch naar het juiste project en de juiste instellingen routeren zonder dat er meerdere geneste beslissingen nodig zijn.

| # | Inhoudstype    | Projectsjabloon | Kwaliteitsdrempel |
|---|----------------|-----------------|-------------------|
| 1 | Marketing      | Template A      | 0.9               |
| 2 | Technisch      | Template B      | 0.85              |
| 3 | Door gebruiker gegenereerd | Template C | 0.8       |

![Custom](../../../../assets/docs/libraries/Custom.png)

## Hoe maak je je eigen Library

Om een nieuwe library toe te voegen kun je:

1. Klik op de knop `Add Library`. Kies een naam en beschrijving. Open de library en voeg handmatig rijen en kolommen toe, waarbij je de inhoud vult door de cellen in te vullen met relevante waarden.

![Add Library](../../../../assets/docs/libraries/AddLibrary.gif)

2. Kloon een bestaande library en bewerk de inhoud ervan.

![Clone Library](../../../../assets/docs/libraries/CloneLibrary.gif)

3. Importeer een of meerdere .csv-bestanden met de knop `Import`. De inhoud van het bestand wordt de inhoud van de library, waarbij de bovenste rij als kolomkoppen wordt gebruikt en de linkerkolom als entiteitsnamen. Standaard wordt de naam van je eerste bestand de naam van de library, tenzij je deze bewerkt. Naam en beschrijving kunnen ook later worden bewerkt.

![Import Library](../../../../assets/docs/libraries/ImportLibrary.gif)

> Libraries kunnen ook worden gekopieerd naar andere Nests, geëxporteerd als `.csv`-bestanden, hernoemd en verwijderd.