---
title: Cloud Storage to Machine Translation
description: Egy Tojás, amely potenciálisan létrehozhat egy Cloud Storage-ból Machine Translation-be és vissza történő madarat
sidebar:
  label: Storage to MT
  order: 1
  hidden: false
---

### Tojások: Kiindulási pontok a madaraidhoz

A Blackbird-ben a Tojások a munkafolyamataid magjai vagy tervrajzai. Olyan kezdeti ötleteket képviselnek, amelyek potenciálisan teljes értékű Madarakká válhatnak.

Ebben a Tojás-útmutatóban nézzünk meg néhány lehetőséget a felhőalapú tárhely és a gépi fordítás integrálására. [**Letölthető Tojásokat** találsz a végén!](https://docs.blackbird.io/eggs/storage-to-mt/#download-an-egg)

## Folyamat vázlata

1. **Indító esemény: Fájl(ok) feltöltése felhőalapú tárhelyre**
A felhasználók fájlokat töltenek fel a választott felhőalapú tárhely alkalmazásba. Ez a művelet indítja el munkafolyamatunkat.
2. **Fájl letöltés**
A fájlok letöltődnek a felhőalapú tárhelyről.
3. **Gépi fordítás**
A letöltött fájlokat gépi fordítási rendszerbe küldik gyors feldolgozásra.
4. **Lefordított fájl feltöltése**
A lefordított fájlokat visszatöltik a felhőalapú tárhelyre, egy kijelölt kimeneti mappába helyezve.

Tojás a Google Drive és a DeepL között
![Tojás](../../../../assets/docs/eggs/Eggs1.png)

## Tippek

- **Lekérdezési események:** Egyes alkalmazások [lekérdezést](https://docs.blackbird.io/concepts/triggers/#polling) használnak webhookok helyett a frissített/új fájlok észlelésére. Ellenőrizd az _Interval_ lapot az indító esemény beállításakor, és válaszd ki a számodra megfelelő időt (5 perc és 7 nap között).
- **Szójegyzék integráció:** Amikor az MT alkalmazás lehetővé teszi, a felhasználók szójegyzékeket adhatnak hozzá a fordítás pontosságának és konzisztenciájának növelése érdekében. A szójegyzékek exportálhatók számos alkalmazásból, és a Blackbird biztosítja a kompatibilitást (az alkalmazások között szerepelnek a TMS és CAT eszközök, [Microsoft Excel táblázatok](https://docs.blackbird.io/apps/microsoft-excel/#exporting-glossaries), [DeepL](https://docs.blackbird.io/apps/deepl/#glossaries), [OpenAI](https://docs.blackbird.io/apps/openai/#glossary-extraction)).
- **Célnyelv:** Kiválaszthatod a nyelvet az általad használt MT alkalmazás dinamikus bemeneteiből. Használhatsz operátorokat is az előre meghatározott nyelvek listájának végigfuttatásához (lásd a több nyelvű Tojást [az alján](https://docs.blackbird.io/eggs/storage-to-mt/#download-an-egg) és a több nyelvi tömböket közvetlenül a Tippek szakasz alatt). Alternatív megoldásként ezt az információt egy másik alkalmazásból/műveletből is lekérheted. Minden a folyamatod jellegétől függ.
- **Opcionális paraméterek:** Sok MT alkalmazás különböző beállítható paramétereket kínál, mint például szótárak, formalitás és egyedi motor. Ellenőrizd az összes lépés bemeneti lapját.
- **Kimeneti mappa beállítása:** Amikor a fájljaidat visszatöltöd a választott felhőalapú tárhelyre, győződj meg róla, hogy új mappát állítasz be, hogy elkerüld az eredeti fájlok felülírását vagy egy végtelen hurok létrehozását, ahol a lefordított fájlok új indítóeseményként szolgálnak és újra feldolgozásra kerülnek.
- **Használd a megfelelő bemenetet:** Amikor újra feltöltöd a fájlodat, győződj meg róla, hogy a megfelelő bemenetet választod. Ha az exportált fájlt választod, akkor ugyanazt a fájlt importálod újra, változtatások nélkül. Válaszd inkább a fordítási művelet kimeneti fájlját.
- **Hurkok szükségesek:** Akár a célnyelvek listáján akarsz végighaladni, akár a letöltött fájlcsoporton belül minden egyes fájlt olyan műveletbe szeretnél küldeni, amely egyszerre csak egyet fogad, a [hurkok](https://docs.blackbird.io/guides/loops/) jelentik a kulcsot.
- **Fájl átnevezés:** Megváltoztathatod a fájlok nevét a visszatöltés előtt. Ha a célnyelv kódját szeretnéd a fájlnév végéhez csatolni, vagy a fájlnévben jelezni, hogy gépi fordításon esett át, használhatod a [Utilities](https://docs.blackbird.io/apps/utilities/) alkalmazást vagy más [segédeszközöket](https://docs.blackbird.io/guides/toolbox/). Ehhez letölthető munkafolyamat-példa található az [oldal alján](https://docs.blackbird.io/eggs/storage-to-mt/#download-an-egg).

Tojás a Google Drive és DeepL között szójegyzékekkel.
![Tojás szójegyzékkel](../../../../assets/docs/eggs/Eggs1_withGlossary.png)

Nyelvkódok tömbjének hozzáadása egy hurokhoz.
![Több nyelv](../../../../assets/docs/eggs/MultipleLangs.png)

## Javasolt alkalmazások

### Felhőalapú tárhely

- [Dropbox](https://docs.blackbird.io/apps/dropbox/)
- [Amazon S3](https://docs.blackbird.io/apps/amazon-s3/)
- [Box](https://docs.blackbird.io/apps/box/)
- [Google Drive](https://docs.blackbird.io/apps/google-drive/)
- [Microsoft SharePoint](https://docs.blackbird.io/apps/microsoft-sharepoint/)
- [SFTP](https://docs.blackbird.io/apps/sftp/)

### Gépi fordítás

- [Language Weaver](https://docs.blackbird.io/apps/language-weaver/)
- [DeepL](https://docs.blackbird.io/apps/deepl/)
- [Amazon Translate](https://docs.blackbird.io/apps/amazon-translate/)
- [GlobalLink NOW](https://docs.blackbird.io/apps/globallink-now/)
- [Google Translate](https://docs.blackbird.io/apps/google-translate/)

Tojás a Dropbox és a GlobalLink NOW között
![Tojás GL NOW](../../../../assets/docs/eggs/Eggs1_GlobalLinkNow.png)

Tojás az Amazon S3 és a Language Weaver között
![Tojás S3 Language Weaver](../../../../assets/docs/eggs/Eggs1_S3toLanguageWeaver.png)

## Tojás letöltése

Töltsd le a JSON munkafolyamatokat, hogy importálhasd a Fészkedbe, végezd el a kívánt módosításokat, és **repülj**.

- <a href="https://docs.blackbird.io/downloads/Sharepoint_to_Amazon_Translate_and_back.json" download>SharePoint to Amazon Translate és vissza</a>
- <a href="https://docs.blackbird.io//downloads/AmazonS3_to_Language_Weaver.json" download>Amazon S3 to Language Weaver</a>  
- <a href="https://docs.blackbird.io//downloads/Dropbox_to_GlobalLink_NOW_set_multiple_languages.json" download>Dropbox to GlobalLink NOW több nyelv beállítása</a>  
- <a href="https://docs.blackbird.io//downloads/Dropbox_to_GlobalLink_NOW_and_back.json" download>Dropbox to GlobalLink NOW és vissza</a>  
- <a href="https://docs.blackbird.io//downloads/Google_Drive_to_DeepL_and_back.json" download>Google Drive to DeepL és vissza</a>  
- <a href="https://docs.blackbird.io//downloads/Google_Drive_to_DeepL_with_Phrase_Glossary_and_back.json" download>Google Drive to DeepL with Phrase Glossary és vissza</a>  
- <a href="https://docs.blackbird.io//downloads/SFTP_to_Google_Translate_with_file_renaming.json" download>SFTP to Google Translate fájlátnevezéssel</a>

### Tojások importálása

Tojás importálása a Fészkedbe:

1. Navigálj a Madár szerkesztő részhez.
2. Kattints az Importálás gombra a jobb felső sarokban.
3. Válaszd ki az importálandó Tojás (JSON) fájlt, és kattints az `Import` gombra.
4. Keresd meg az újonnan létrehozott Madarat, és kattints rá a szerkesztéshez.
5. Frissítsd a Kapcsolat részleteit és minden más szükséges bemeneti/kimeneti paramétert vagy kívánt lépést. Figyelj a lépés neve mellett megjelenő piros figyelmeztető jelekre, amelyek az adott lépésben hiányzó részletekre utalnak.
6. Kattints a Mentés/Közzététel gombra.

![Tojások importálása](../../../../assets/docs/eggs/ImportEggs.gif)