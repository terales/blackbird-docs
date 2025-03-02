---
title: TMS to LLM and Back
description: Een Egg met het potentieel om een TMS naar LLM en terug Bird te creëren
sidebar:
  label: TMS to LLM
  order: 2
  hidden: false
---

### Eggs: Startpunten voor uw Birds

In Blackbird zijn Eggs de zaden of blauwdrukken voor uw workflows. Ze vertegenwoordigen de initiële ideeën die het potentieel hebben om volledig ontwikkelde Birds te worden.

In deze Egg-gids verkennen we enkele opties om een TMS en een LLM te integreren. [Vind **Downloadbare Eggs** aan het einde!](https://docs.blackbird.io/eggs/tms-to-llm/#download-an-egg)

## Procesoverzicht

1. **Trigger: status in uw TMS**
Bestanden, Taken of Projecten bereiken een bepaalde status in uw TMS-workflow
2. **Bestand downloaden**
Bestanden worden gedownload van de TMS.
3. **LLM**
De gedownloade bestanden worden naar een LLM gestuurd voor verwerking.
4. **Verwerkte bestanden uploaden**
Verwerkte bestanden worden terug geüpload naar de TMS.

Egg tussen Phrase en Anthropic
![Egg](~/assets/docs/eggs/Egg2-Phrase-to-Anthropic.png)

## Tips

- **Prompt:** Binnen de optionele invoervelden kunt u uw eigen instructies voor de LLM toevoegen.
- **Bucket grootte:** XLIFF-bestanden kunnen veel segmenten bevatten. Elke actie neemt uw segmenten en stuurt ze naar de LLM voor verwerking. Het is mogelijk dat het aantal segmenten zo hoog is dat de prompt het contextvenster van het model overschrijdt of dat het model langer duurt dan Blackbird-acties mogen duren. Daarom hebben we de bucket grootte parameter geïntroduceerd. U kunt de bucket grootte parameter aanpassen om te bepalen hoeveel segmenten tegelijk naar de LLM worden gestuurd. Zo kunt u de werklast in verschillende oproepen verdelen. De afweging is dat dezelfde context-prompt bij elke aanvraag moet worden meegestuurd (wat het aantal gebruikte tokens verhoogt). Uit experimenten is gebleken dat een bucket grootte van 1500 voldoende is voor modellen zoals gpt-4o. Daarom is 1500 de standaard bucket grootte, maar andere modellen kunnen verschillende bucket groottes vereisen.
- **Polling Events:** Sommige apps gebruiken [polling](https://docs.blackbird.io/concepts/triggers/#polling) in plaats van webhooks om bijgewerkte/nieuwe bestanden te detecteren. Controleer of er een tabblad _Interval_ is bij het instellen van uw trigger en kies de juiste tijd voor u (tussen 5 minuten en 7 dagen).
- **Glossarium Integratie:** Glossaria kunnen worden toegevoegd om de nauwkeurigheid en consistentie van vertalingen te verbeteren. Ze kunnen worden geëxporteerd uit verschillende apps, en Blackbird zorgt voor compatibiliteit (apps omvatten TMS & CAT-tools, zelfs [Microsoft Excel-sheets](https://docs.blackbird.io/apps/microsoft-excel/#exporting-glossaries)).
- **Doeltaal:** U kunt een taal selecteren uit de invoer van de LLM-app die u gebruikt. Als er geen worden opgegeven, worden de talen uit de header van uw XLIFF-bestanden gehaald.
- **Optionele parameters:** Veel LLM-apps bieden verschillende parameters die kunnen worden ingesteld, zoals formaliteit, temperatuur, modellen en bucket grootte. Controleer het invoertabblad voor alle stappen.
- **Loops zijn nodig:** Of het nu gaat om het doorlopen van een lijst met doeltalen of het sturen van elk bestand binnen een groep gedownloade bestanden naar een actie die er slechts één tegelijk accepteert, [loops](https://docs.blackbird.io/guides/loops/) zijn de sleutel.

Egg tussen MemoQ en Anthropic
![Egg simple](~/assets/docs/eggs/Egg2-memoQ-to-Anthropic.png)

Egg tussen MemoQ en OpenAI met glossaria.
![Egg with Glossary](~/assets/docs/eggs/Egg2-memoQ-to-OpenAI-with-glossary.png)

## Aanbevolen Apps

### LLMs

- [OpenAI](https://docs.blackbird.io/apps/openai/)
- [Anthropic](https://docs.blackbird.io/apps/anthropic/)
- [Google Vertex AI](https://docs.blackbird.io/apps/google-vertex-ai/)

## Download een Egg

Download JSON-workflows om te importeren in uw Nest, maak gewenste aanpassingen en **fly**.

- <a href="https://docs.blackbird.io/downloads/MemoQ_to_OpenAI.json" download>MemoQ to OpenAI</a>
- <a href="https://docs.blackbird.io/downloads/MemoQ_to_OpenAI_with_Glossary.json" download>MemoQ to OpenAI with glossaries</a>
- <a href="https://docs.blackbird.io/downloads/MemoQ_to_Anthropic.json" download>MemoQ to Anthropic</a>
- <a href="https://docs.blackbird.io/downloads/Phrase_to_Anthropic.json" download>Phrase to Anthropic</a>

### Eggs importeren

Om een Egg in uw Nest te importeren:

1. Navigeer naar de Bird Editor sectie.
2. Klik op Importeren rechtsboven.
3. Selecteer het Egg (JSON) bestand om te importeren en klik op `Import`.
4. Identificeer de nieuw aangemaakte Bird en klik erop om het te bewerken.
5. Voeg Verbindingsdetails toe en alle andere benodigde invoer/uitvoerparameters of gewenste stappen. Let op rode waarschuwingstekens naast de naam van de stap die aangeven dat er details ontbreken in die stap.
6. Klik op de drie puntjes naast de naam van de Bird en update de apps als er updates beschikbaar zijn.
7. Klik op Opslaan/Publiceren.

![Importing Eggs](~/assets/docs/eggs/ImportEggs.gif)