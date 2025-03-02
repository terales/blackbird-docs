---
locale: nl
title: Veelvoorkomende e-mail naar bestelling/project use cases
description: Laten we dieper ingaan op veelvoorkomende use cases rondom e-mail
sidebar:
  label: E-mail
  order: 6
  hidden: true
---

### Eggs: Startpunten voor uw Birds

In Blackbird zijn Eggs de kiemen of blauwdrukken voor uw workflows. Ze vertegenwoordigen de eerste ideeën die kunnen uitgroeien tot volwaardige Birds.

In deze Egg-gids onderzoeken we enkele veelvoorkomende use cases rondom e-mails met behulp van [Microsoft Outlook](../../apps/microsoft-365-email-outlook/) of [Gmail](../../apps/gmail/). Vind **Downloadable Eggs** aan het einde - download JSON-workflows om [te importeren in uw Nest](../../eggs/emails/#importing-eggs), voeg uw verbindingen toe, maak gewenste aanpassingen en **vlieg**.

## Procesoverzicht

1. **Trigger: E-mail met bijlagen ontvangen**
Zodra een e-mail met bijgevoegde bestanden wordt ontvangen, start de Bird.
2. **Informatie-extractie**
Door gebruik te maken van reguliere expressies of een LLM wordt relevante data verzameld. Bijgevoegde bestanden worden gedownload.
3. **Bestelling/project aanmaken**
De geëxtraheerde informatie uit de e-mailtekst wordt gebruikt om een nieuwe bestelling of project in te vullen. Bestanden worden geüpload.
4. **E-mail antwoord**
Nieuwe bestelling/project details worden als antwoord verzonden. Machinaal vertaalde bestanden kunnen ook als onmiddellijke reactie worden verzonden.

## Tips

- **Filters:** Beslissingsstappen of filters kunnen worden toegevoegd om ervoor te zorgen dat alleen de juiste e-mails worden opgepikt. Bijv. controleren of het onderwerp bepaalde vooraf gedefinieerde trefwoorden bevat. Als u de [Gmail](../../apps/gmail/) app gebruikt, kan een filter worden toegevoegd aan de `On emails received` trigger in de vorm van een zoekopdracht.
- **Informatie-extractie:** een formulierstructuur kan worden afgesproken om informatie te extraheren met behulp van reguliere expressies. Dit kan foutgevoelig zijn vanwege afhankelijkheid van menselijke input. Een LLM kan ook worden gebruikt om de belangrijke details uit de e-mailtekst in het vereiste formaat te halen.
- **Taalconversie:** Apps gebruiken verschillende taalcodestandaarden. [Libraries](../../concepts/libraries/) helpen deze verschillen op te lossen.
- **Machinevertaling:** MT-apps kunnen worden gebruikt om vrijwel direct vertaalde bestanden terug te sturen.
- **Kwaliteitsinschatting** Een beslissingsstap kan worden toegevoegd om te bepalen of de MT-vertalingen als definitief moeten worden teruggestuurd of doorgestuurd moeten worden naar menselijke beoordeling.
- **Polling Events:** Sommige apps gebruiken [polling](../../concepts/triggers/#polling) in plaats van webhooks om nieuwe e-mails te detecteren. Controleer op een _Interval_ tabblad bij het instellen van uw trigger en kies de geschikte tijd voor u (tussen 5 minuten en 7 dagen).

Egg die e-mails van Outlook naar DeepL en Trados haalt.
![Egg with emails](~/assets/docs/eggs/Egg6_Outlook_DeepL_Trados.png)

Nadere blik op e-mailaantwoord.
![Email reply](~/assets/docs/eggs/Egg6_InstantReply.png)

Voorbeeldprompt om taalcodes te krijgen
![LLM prompt](~/assets/docs/eggs/Egg6_GetLanguageExample.png)

Taalcodes extraheren met Regular expressions.
![Regex](~/assets/docs/eggs/Egg6_ExtractLanguagesRegex.png)

## Download een Egg

Download JSON-workflows om te importeren in uw Nest, maak gewenste aanpassingen en **vlieg**.

- <a href="https://docs.blackbird.io/downloads/Outlook_MT_memoQ.json" download>Outlook e-mails naar DeepL naar memoQ</a>
- <a href="https://docs.blackbird.io//downloads/Outlook_MT_Trados.json" download>Outlook e-mails naar DeepL naar Trados</a>
- <a href="https://docs.blackbird.io//downloads/Gmail_to_quote.json" download>Gmail naar offerte</a>

## Eggs importeren

Om een Egg in uw Nest te importeren:

1. Navigeer naar de Bird Editor sectie.
2. Klik op Import rechtsboven.
3. Selecteer het Egg (JSON) bestand om te importeren en klik op `Import`.
4. Identificeer de nieuw gemaakte Bird en klik erop om deze te bewerken.
5. Werk de Connection details bij en eventuele andere benodigde invoer/uitvoerparameters of gewenste stappen. Let op rode waarschuwingstekens naast de stapnaam die ontbrekende details in die stap signaleren.
6. Klik op Opslaan/Publiceren.

![Importing Eggs](~/assets/docs/eggs/ImportEggs.gif)