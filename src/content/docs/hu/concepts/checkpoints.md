---
title: Checkpoints
description: A Checkpoints bemutatása
sidebar:
  label: Checkpoints
  order: 6
  hidden: false
---

A Blackbird kiadott egy új, hatékony funkciót, a Checkpoints-ot, amely a munkafolyamat-automatizálást továbbfejlesztve képes több eseményindító kezelésére és az emberi beavatkozás lehetővé tételére kulcsfontosságú pontokon. Ez az útmutató elmagyarázza, hogyan működik a Checkpoints, milyen előnyöket nyújt, és hogyan használhatod fel azokat nagyobb hatékonyság és irányítás érdekében a munkafolyamataidban.

## Mik azok a Checkpoints?

A Blackbird munkafolyamatokban a Checkpoints olyan _ellenőrzési lépések_, amelyek lehetővé teszik a Birds számára, hogy **szüneteljenek és várjanak** különböző eseményekre, mielőtt folytatnák a Flights-okat. Ezek az eseményindítók lehetnek automatizált és emberi beavatkozást igénylő műveletek kombinációi. Ahelyett, hogy egyetlen, lineáris eseményindító útvonalat követnének, a Checkpoints lehetővé teszi a munkafolyamatok rugalmas kezelését, ahol szükség van jóváhagyásokra, felülvizsgálatokra vagy külső eseményekre való várakozásra.

![Shopify to Phrase](../../../../assets/guides/checkpoints/ShopifyToPhrase.png)

A hagyományos munkafolyamatok általában egyetlen eseményláncolatot követnek, amelyet egy kezdeti művelet indít el (pl. egy fájl feltöltése vagy egy feladat kiosztása). A Checkpoints segítségével több eseményindító pont van beágyazva egy Bird-be, lehetővé téve a szüneteket és ellenőrzéseket a folyamat során. Ez rugalmasabb folyamatokat hoz létre, különösen akkor hasznos, amikor bizonyos lépések emberi közreműködést igényelnek, vagy várniuk kell a külső rendszerek válaszára vagy hosszú futásidejű feladatok befejezésére. Például egy dokumentum fordításra küldése után várnunk kell, amíg a fordítás elkészül, mielőtt közzétehetnénk. **Ez a funkció a komplex, többszörös Bird munkafolyamatokat egyetlen átfogó Bird-dé alakítja**.

![MarketoToPlunet](../../../../assets/guides/checkpoints/MarketoToPlunet.png)

## Milyen előnyöket kínálnak a Checkpoints?

**Főbb előnyök**:

1. **A munkafolyamatok jobban illeszkednek a gondolkodási folyamatokhoz**. Egy Bird egy teljes munkafolyamatot foglal magában.
2. **Megnövekedett Bird hatékonyság**. Egy Bird képes helyettesíteni egy olyan folyamatot, amelyet korábban több Bird-re kellett bontani.
3. **Nincs szükség entitás összekapcsolásra vagy egyedi mezőkre** ugyanazon entitások Bird-ek közötti leképezéséhez. Mivel a teljes folyamat egy Bird-ben van leírva, az információk zökkenőmentesen kerülnek át a korábbi lépésekből.

## Hogyan adhatok hozzá Checkpoint-ot a Bird-emhez?

Kattints a plusz jelre, ahogy bármely más lépés hozzáadásánál tennéd, és válaszd ki a `Checkpoint` opciót. Válassz, hogy egy alkalmazásban bekövetkező `Event`-re vársz, vagy egy meghatározott időtartamra (`Delay`). Ha úgy döntöttél, hogy egy eseményre vársz, akkor kattintanod kell a folytatás gombra, vagy menj a `Connection` fülre, majd válaszd ki az alkalmazást, az esemény típusát, a kapcsolatodat és a figyelni kívánt objektum pontos azonosítóját — ha egy projekt befejezésére vársz, megadhatod a projekt azonosítóját, hogy a Flight csak akkor folytatódjon, amikor ez a konkrét projekt befejeződött. Ha a Delay opciót választottad, akkor meg kell határoznod a várakozási időt a `Duration` fülön.

![Adding a checkpoint GIF](../../../../assets/guides/checkpoints/AddingCheckpoint.gif)

## Példák

### Fordításkezelő rendszerek (TMS)
Azon vállalkozások számára, amelyek TMS eszközöket használnak (mint például Phrase vagy RWS WorldServer, stb.), a fordítási feladatokat általában embereknek kell elvégezniük. A Checkpoints lehetővé teszi, hogy a munkafolyamatok leálljanak, amíg a fordításokat felülvizsgálják vagy befejezik.

![MemoQ wordpress with checkpoints](../../../../assets/guides/checkpoints/wordpress_memoq.png)

A fenti kép egy olyan Bird-et mutat, amely új bejegyzéseket vesz át a Wordpress-ből, létrehoz egy projektet a memoQ-ban, importálja a bejegyzéseket HTML forrás dokumentumként az újonnan létrehozott memoQ projektbe, vár arra, hogy a memoQ-ban a projekt állapota "Wrapped up" legyen, majd letölti a lefordított dokumentumokat és feltölti azokat a Wordpress-be.

### Emberi jóváhagyások a projektmenedzsmentben
Olyan platformokon, mint az Asana, Jira vagy Trello, bizonyos feladatok jóváhagyást igényelnek, mielőtt továbblépnének. A Checkpoints segítségével a munkafolyamatok szünetelhetnek, amíg a szükséges felülvizsgálat vagy jóváhagyás befejeződik. Ez biztosítja, hogy semmi ne maradjon ki, és a jóváhagyások zökkenőmentesen integrálódjanak a folyamatba.

![Jira](../../../../assets/guides/checkpoints/Jira.png)

A fenti kép egy két Checkpoint-ot tartalmazó Bird-et mutat. A folyamat akkor indul, amikor egy új Zendesk cikket közzétesznek, az új cikk tartalmát HTML-ként kivonják és forrás fájlként hozzáadják egy újonnan létrehozott Trados projekthez. Ezen a ponton a folyamat szünetel, és amikor a projektet frissítik és eléri a kívánt állapotot, a célnyelvi fájlt letöltik és hozzáadják egy új Jira feladathoz mellékletként. Újabb megállást érünk el, mivel a folyamat arra vár, hogy a Jira feladat állapota megváltozzon, lehetővé téve az emberi beavatkozást — lehet, hogy egy jogi vagy marketing csapatnak felül kell vizsgálnia a fordítást. Ezután egy döntési pont következik: ha az új állapot "Approved", akkor a lefordított Zendesk cikket közzéteszik. Ellenkező esetben értesítik a megfelelő Teams csatornát.

### Nagy nyelvi modellek (LLM-ek) és kötegelt feldolgozás
Amikor olyan LLM szolgáltatásokat használunk, mint az [OpenAI Batch API](https://docs.blackbird.io/apps/openai/#batch-processing) tartalom generálásához vagy adatfeldolgozáshoz (különösen hosszú futásidejű feladatokhoz), egy Checkpoint szüneteltetheti a munkafolyamatot, amíg az LLM eredményt nem ad, vagy egy kötegelt folyamat befejeződik. Ha további emberi érvényesítésre van szükség, a munkafolyamat várhat erre a bemenetre, mielőtt a következő szakaszba lépne.

![Open AI batch](../../../../assets/guides/checkpoints/OpenAICheckpoint.png)

A fenti kép egy olyan Bird-et ábrázol, ahol kétnyelvű fájlokat exportálnak a Phrase-ből, amint a munkák elérnek egy bizonyos állapotot, majd ezeket a fájlokat az OpenAI Batch API segítségével dolgozzák fel. A munkafolyamat megáll, amíg a kötegelt feldolgozás befejeződik, és amint ez megtörténik, a létrejött fájlokat visszatöltik a Phrase-be.