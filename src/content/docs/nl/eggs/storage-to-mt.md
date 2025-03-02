---
title: Cloud Storage to Machine Translation
description: Een Egg met het potentieel om een Cloud Storage naar Machine Translation en terug Bird te creëren
sidebar:
  label: Storage to MT
  order: 1
  hidden: false
---

### Eggs: Startpunten voor uw Birds

In Blackbird.io zijn Eggs de zaden of blauwdrukken voor uw workflows. Ze vertegenwoordigen de initiële ideeën die het potentieel hebben om volledig ontwikkelde Birds te worden.

In deze Egg-gids verkennen we enkele opties om cloudopslag te integreren met machinevertaling. [Vind **Downloadbare Eggs** aan het einde!](https://docs.blackbird.io/eggs/storage-to-mt/#download-an-egg)

## Procesoverzicht

1. **Trigger: Bestand(en) geüpload naar cloudopslag**
Gebruikers uploaden bestanden naar een gekozen cloudopslagapplicatie. Deze actie zet onze workflow in beweging.
2. **Bestand downloaden**
Bestanden worden gedownload van de cloudopslag.
3. **Machinevertaling**
De gedownloade bestanden worden naar een machinevertaalengine gestuurd voor snelle verwerking.
4. **Vertaald bestand uploaden**
Vertaalde bestanden worden terug geüpload naar de cloudopslag, geplaatst in een aangewezen uitvoermap.

Egg tussen Google Drive en DeepL
![Egg](../../../../assets/docs/eggs/Eggs1.png)

## Tips

- **Polling Events:** Sommige apps gebruiken [polling](https://docs.blackbird.io/concepts/triggers/#polling) in plaats van webhooks om bijgewerkte/nieuwe bestanden te detecteren. Controleer op een _Interval_ tab bij het instellen van uw trigger en kies de juiste tijd voor u (tussen 5 minuten en 7 dagen).
- **Glossary Integratie:** Wanneer de MT-app het toestaat, kunnen gebruikers glossaries toevoegen om de vertaalnauwkeurigheid en consistentie te verbeteren. Glossaries kunnen worden geëxporteerd uit verschillende apps, en Blackbird.io zorgt voor compatibiliteit (apps omvatten TMS & CAT tools, [Microsoft Excel sheets](https://docs.blackbird.io/apps/microsoft-excel/#exporting-glossaries), [DeepL](https://docs.blackbird.io/apps/deepl/#glossaries), [OpenAI](https://docs.blackbird.io/apps/openai/#glossary-extraction)).
- **Doeltaal:** U kunt een taal selecteren uit de dynamische invoer van de MT-app die u gebruikt. U kunt ook operatoren gebruiken om door een lijst met voorgedefinieerde talen te navigeren (zie Egg met meerdere talen [onderaan](https://docs.blackbird.io/eggs/storage-to-mt/#download-an-egg) en meerdere taalarrays direct onder de Tips sectie). Alternatief kunt u deze informatie ook ophalen uit een andere app/actie. Het hangt allemaal af van hoe uw proces eruitziet.
- **Optionele parameters:** Veel MT-apps bieden verschillende parameters die kunnen worden ingesteld, zoals woordenboeken, formaliteit en aangepaste engines. Controleer het invoertabblad voor alle stappen.
- **Uitvoermap instellen:** Bij het uploaden van uw bestanden terug naar de cloudopslag van uw keuze, zorg ervoor dat u een nieuwe map instelt om te voorkomen dat uw originele bestanden worden overschreven of dat er een oneindige lus ontstaat waarbij vertaalde bestanden dienen als een nieuwe trigger en opnieuw worden verwerkt.
- **Gebruik de juiste invoer:** Bij het opnieuw uploaden van uw bestand, zorg ervoor dat u de juiste invoer selecteert. Als u het geëxporteerde bestand kiest, importeert u precies hetzelfde bestand zonder wijzigingen. Kies in plaats daarvan het uitvoerbestand van de vertaalactie.
- **Loops zijn nodig:** Of het nu gaat om door een lijst met doeltalen te itereren of om elk bestand binnen een groep gedownloade bestanden naar een actie te sturen die er maar één tegelijk kan verwerken, [loops](https://docs.blackbird.io/guides/loops/) zijn de sleutel.
- **Bestand hernoemen:** U kunt de naam van bestanden wijzigen voordat u ze opnieuw uploadt. Als u de doeltaalcode aan het einde van uw bestandsnaam wilt toevoegen of via de bestandsnaam wilt aangeven dat het MT is, kunt u de [Utilities](https://docs.blackbird.io/apps/utilities/) app of andere [helpers](https://docs.blackbird.io/guides/toolbox/) gebruiken. Er is een downloadbaar workflow-voorbeeld hiervoor aan de [onderkant van de pagina](https://docs.blackbird.io/eggs/storage-to-mt/#download-an-egg).

Egg tussen Google Drive en DeepL met glossaries.
![Egg with Glossary](../../../../assets/docs/eggs/Eggs1_withGlossary.png)

Een array van taalcodes toevoegen aan een loop.
![Multiple languages](../../../../assets/docs/eggs/MultipleLangs.png)

## Aanbevolen Apps

### Cloud Storage

- [Dropbox](https://docs.blackbird.io/apps/dropbox/)
- [Amazon S3](https://docs.blackbird.io/apps/amazon-s3/)
- [Box](https://docs.blackbird.io/apps/box/)
- [Google Drive](https://docs.blackbird.io/apps/google-drive/)
- [Microsoft SharePoint](https://docs.blackbird.io/apps/microsoft-sharepoint/)
- [SFTP](https://docs.blackbird.io/apps/sftp/)

### Machine Translation

- [Language Weaver](https://docs.blackbird.io/apps/language-weaver/)
- [DeepL](https://docs.blackbird.io/apps/deepl/)
- [Amazon Translate](https://docs.blackbird.io/apps/amazon-translate/)
- [GlobalLink NOW](https://docs.blackbird.io/apps/globallink-now/)
- [Google Translate](https://docs.blackbird.io/apps/google-translate/)

Egg tussen Dropbox en GlobalLink NOW
![Egg GL NOW](../../../../assets/docs/eggs/Eggs1_GlobalLinkNow.png)

Egg tussen Amazon S3 en Lanugage Weaver
![Egg S3 Language Weaver](../../../../assets/docs/eggs/Eggs1_S3toLanguageWeaver.png)

## Download een Egg

Download JSON workflows om te importeren in uw Nest, maak gewenste aanpassingen, en **fly**.

- <a href="https://docs.blackbird.io/downloads/Sharepoint_to_Amazon_Translate_and_back.json" download>SharePoint to Amazon Translate and back</a>
- <a href="https://docs.blackbird.io//downloads/AmazonS3_to_Language_Weaver.json" download>Amazon S3 to Language Weaver</a>  
- <a href="https://docs.blackbird.io//downloads/Dropbox_to_GlobalLink_NOW_set_multiple_languages.json" download>Dropbox to GlobalLink NOW set multiple languages</a>  
- <a href="https://docs.blackbird.io//downloads/Dropbox_to_GlobalLink_NOW_and_back.json" download>Dropbox to GlobalLink NOW and back</a>  
- <a href="https://docs.blackbird.io//downloads/Google_Drive_to_DeepL_and_back.json" download>Google Drive to DeepL and back</a>  
- <a href="https://docs.blackbird.io//downloads/Google_Drive_to_DeepL_with_Phrase_Glossary_and_back.json" download>Google Drive to DeepL with Phrase Glossary and back</a>  
- <a href="https://docs.blackbird.io//downloads/SFTP_to_Google_Translate_with_file_renaming.json" download>SFTP to Google Translate with file renaming</a>

### Eggs importeren

Om een Egg in uw Nest te importeren:

1. Navigeer naar de Bird Editor sectie.
2. Klik op Import rechtsboven.
3. Selecteer het Egg (JSON) bestand om te importeren en klik op `Import`.
4. Identificeer de nieuw aangemaakte Bird en klik erop om het te bewerken.
5. Werk de Connection-details bij en alle andere benodigde invoer/uitvoerparameters of gewenste stappen. Let op rode waarschuwingstekens naast de stapnaam die ontbrekende details in die stap signaleren.
6. Klik op Opslaan/Publiceren.

![Importing Eggs](../../../../assets/docs/eggs/ImportEggs.gif)