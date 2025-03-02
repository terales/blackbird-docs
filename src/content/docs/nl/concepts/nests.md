---
locale: nl
title: Let's Talk About Nests & Access Control
description: In deze gids leert u over de manier waarop Blackbird uw processen, inloggegevens en gebruikers compartimenteert.
sidebar:
  label: Nests & Toegangsbeheer
  order: 3
  hidden: false
---

In deze gids leert u over de manier waarop Blackbird uw processen, inloggegevens en gebruikers compartimenteert.

> Als beheerder met toegang tot uw Blackbird-account heeft u de mogelijkheid om meerdere Nests, gebruikers en rollen te creëren die passen bij de behoeften van uw organisatie. Navigeer naar Organisatiebeheer om toegang te krijgen tot deze opties.

## Nests

Het gescheiden houden van uw gegevens versterkt niet alleen de veiligheidsmaatregelen, maar verhoogt ook de productiviteit omdat een duidelijke afbakening van gegevenscompartimenten onnodige rommel elimineert. Overweeg om een aparte Nest te maken voor elk van uw klanten of per fase van uw workflowontwerpproces (speelomgeving, QA, productie) - of zelfs beide, aangezien Nests ook subnests kunnen hebben voor verdere organisatie. Klik rechtsboven op uw profielfoto en selecteer Organisatiebeheer. De eerste optie aan de linkerkant is Nests; u ziet een lijst van de bestaande Nests onder uw organisatie met hun namen, totaal aantal gebruikers en aanmaakdatum. Door op een specifieke Nest te klikken, ziet u meer details, zoals elke gebruiker die is toegevoegd, en u heeft ook de optie om de betreffende Nest te verwijderen.

![Nests details of users](~/assets/guides/nests/1.png)

Bovenaan vindt u een knop 'Create Nest' om een nieuw compartiment aan te maken.

![Nests create button](~/assets/guides/nests/2.png)

Als u een subnest onder een bestaande Nest wilt toevoegen, klikt u simpelweg op het plusteken aan het einde van de rij van de Nest.

![Create subnest](~/assets/guides/nests/31.png)

![Create subnest](~/assets/guides/nests/32.png)

Subnests erven app-inloggegevens van hun bovenliggende Nest. U kunt bijvoorbeeld één Nest hebben voor Klant 1, hun inloggegevens voor de benodigde apps toevoegen aan deze Nest, en vervolgens subnests maken voor de verschillende werkfasen. De gebruikers met toegang tot de subnests kunnen verbinding maken met deze apps en ze onderdeel maken van hun workflows, terwijl ze de inloggegevens kiezen die u heeft toegevoegd aan de bovenliggende Nest. Ze kunnen deze inloggegevens echter niet beheren (of de details ervan zien). Dit betekent dat u de informatie slechts één keer hoeft in te voeren, omdat deze automatisch wordt overgenomen door subnests.

## Gebruikers

U kunt ook definiëren wie toegang heeft tot elk van deze instanties en wat ze kunnen zien of doen, waardoor u zeer gedetailleerd toegangsbeheer behoudt. Op het tabblad Gebruikers kunt u alle mensen zien die zijn uitgenodigd voor uw organisatie, hun rol en status. Rechtsboven kunt u kiezen om _Add User_ te selecteren. U dient hun naam, e-mailadres in te vullen en de juiste rol(len) en Nest(s) te kiezen waartoe ze toegang krijgen. Zodra u een gebruiker toevoegt, ontvangen ze een e-mailuitnodiging waarin ze worden gevraagd een wachtwoord aan te maken om toegang te krijgen tot Blackbird.

![Add User](~/assets/guides/nests/4.png)

## Rollen

Standaard ziet u de rollen Gebruiker en Beheerder als beschikbare opties. Dit kan echter worden aangepast aan specifieke verantwoordelijkheden en toegangsvereisten. Rollen kunnen worden bewerkt (door te klikken op de specifieke rol die u wilt bijwerken), verwijderd of vanaf nul worden gemaakt. Om een nieuwe rol te creëren, klikt u eenvoudig op _Add role_, geeft u een naam voor deze rol en kiest u welke machtigingen u wilt toekennen.

![Available permissions](~/assets/guides/nests/5.png)

Als voorbeeld kunt u een van uw klanten uitnodigen voor uw Blackbird-instantie en hen een "Klant"-rol geven die hen alleen het recht geeft om hun inloggegevens toe te voegen om verbinding te maken met een app. Op deze manier vermijdt u gegevensmanipulatie of -deling. U kunt klanten hebben die een meer _bevoegde_ rol nodig hebben omdat ze processen willen beoordelen; voor dit doel kunt u hen een bredere maar alleen-lezen toegang geven. Of u wilt misschien een meer samenwerkingsgerichte aanpak en hen in staat stellen om samen met u workflows te bouwen. Dit alles is mogelijk en, net als alles bij Blackbird, bepaalt u het zelf.

## Branding

Tot slot is er een whitelabeloptie onder het tabblad _Branding_ waarmee u uw eigen logo kunt uploaden (om Blackbird's logo in de linkerbovenhoek te vervangen) en het uiterlijk van uw instantie kunt aanpassen.

![Branding](~/assets/guides/nests/6.png)