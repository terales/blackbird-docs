---
title: Gyakori táblázatkezelő használati esetek
description: Mélyedjünk el a táblázatkezelőkkel kapcsolatos gyakori használati esetekben
sidebar:
  label: Táblázatkezelők
  order: 4
  hidden: false
---

### Eggs: Kiindulási pontok a Birds számára

A Blackbirdben az Eggs a munkafolyamatok magjai vagy tervrajzai. Kezdeti ötleteket képviselnek, amelyek teljes értékű Birds-szé válhatnak.

Ebben az Egg-útmutatóban nézzünk meg néhány gyakori használati esetet a táblázatkezelőkkel kapcsolatban, a [Google Sheets](https://docs.blackbird.io/apps/google-sheets/), [Microsoft Excel](https://docs.blackbird.io/apps/microsoft-excel/) vagy [Airtable](https://docs.blackbird.io/apps/airtable/) használatával. A példák alatt találsz **Letölthető Eggs**-et - tölts le JSON munkafolyamatokat, hogy [importáld a Nest-be](https://docs.blackbird.io/eggs/spreadsheets/#importing-eggs), add hozzá a kapcsolataidat, végezz el bármilyen kívánt módosítást, és **indulj el**.

## Használati esetek

### Naplózás és jelentéskészítés

A táblázatkezelők hatékony eszközök lehetnek a kulcsfontosságú adatpontok rögzítésére a munkafolyamat különböző szakaszaiban. Nemcsak belső naplózásra használhatók, hanem a munkafolyamat-információk külső táblázatba küldése jobb láthatóságot és valós idejű elemzésre alkalmas irányítópult-eszközökbe való integrációt is lehetővé tesz.

A `Add new sheet row` művelet a Blackbirdben ideális erre a célra. **Új sort illeszt be a táblázat használt tartományának végére**, és lehetővé teszi több adatpont egymást követő cellákba történő átadását, megtartva a Blackbirdben megadott sorrendet. Azt is ellenőrzi, hogy vannak-e elérhető sorok (Google Sheets), és hozzáad egyet, ha a táblázat végén vagyunk.

![Add new sheet row](~/assets/docs/eggs/AddNewSheetRow.png)

### Információk keresése és frissítése

A dinamikus adatok táblázatkezelőkben történő kezelése gyakran magában foglalja bizonyos információk keresését és frissítését. A `Find sheet row` művelet **megkeres egy megadott értéket egy kijelölt oszlopban, és visszaadja annak a sornak a számát**, ahol az értéket megtalálta (vagy null értéket, ha nem találta).
Példa: Lehet egy oszlopod a táblázatban egyedi rendelési azonosítókkal. Minden frissítéskor naplózni szeretnéd ezeket a változásokat (például állapotfrissítés) a táblázatodban, használd a `Find sheet row` műveletet a releváns sor megkereséséhez az adott rendeléshez, majd az olyan műveletek, mint a `Update sheet row` vagy `Update sheet cell` lehetővé teszik, hogy módosítsd az információkat - például a rendelés állapotát - egy másik oszlopban, de a megfelelő sorban.
Ez a művelet párosítható egy döntési ponttal is annak ellenőrzésére, hogy az egyedi érték már létezik-e a táblázatban. Ha a kimenet null, hozzáadhatsz egy új bejegyzést; ellenkező esetben frissítheted a meglévőt.

![FindSheetRow](~/assets/docs/eggs/FindSheetRow.png)

Ugyanez elvégezhető az Airtable-ben is. Az alábbi kép egy olyan Bird-et mutat, amely minden alkalommal elindul, amikor egy projekt állapotát frissítették a Bureau Works-ben, majd a frissített projekt azonosítóját egyedi azonosítóként használjuk egy oszlopban, és megkapjuk a sor információit a `Search record` művelet használatával. Ezután frissítjük a megfelelő cellát az új állapottal a megfelelő projekthez. Így naprakészen tartjuk a projektinformációkat.

![AirtableSearchRecord](~/assets/docs/eggs/AirtableSearchRecord.png)

- Egg letöltése: <a href="https://docs.blackbird.io/downloads/Bureau_Works_to_Airtable.json" download>Airtable Search record</a>

### Iteráció a táblázat sorain keresztül

A munkafolyamatok gyakran igénylik a táblázatból származó adatok feldolgozását a sorokon való végighaladással, akár adatok kinyerése, akár feldolgozás és frissítések végrehajtása céljából. A Blackbirdben több módja is van annak, hogy végigiterálj egy táblázat használt tartományának minden során (vagy egy részhalmazán), adatokat nyerj ki több oszlopból, és új adatokat adj hozzá ugyanezekhez a sorokhoz.

#### Iteráció generált tartomány használatával:
Ha már tudod, mely sorokat vagy sorok részhalmazát szeretnéd feldolgozni, generálhatsz egy tartományt, és azon keresztül iterálhatsz, minden számot a tartományban sorszámként használva.
1. Használd a `Generate range` műveletet a Utilities alkalmazásban, és add meg a kezdő és befejező számokat. Pl. ha a 2-t adod meg kezdőértékként és az 5-öt befejezőértékként, az eredmény [2,3,4,5] lesz.
2. Adj hozzá egy ciklust a tartományon való iteráláshoz, a ciklus kimenetét az aktuális sorszámként használva.
3. A cikluson belül használd a `Get sheet cell` műveletet az adatok kinyeréséhez, a cellacímet összeállítva (kombinálva az ismert oszlopot az aktuális sorszámmal a ciklusból).
4. Az adatok feldolgozása után használd a `Update sheet cell` műveletet az eredmény hozzáadásához vagy a sor feldolgozottként való megjelöléséhez.

![Generate range](~/assets/docs/eggs/GenerateRange.png)

- Egg letöltése: <a href="https://docs.blackbird.io/downloads/excel_generate_range.json" download>Microsoft Excel Generate Range</a>

Nagyon hasonló módon, amikor a táblázat sorainak száma ismeretlen, dinamikusan lekérheted a használt tartományt, hogy megkapd a táblázat sorainak teljes számát.

1. Használd a `Get used range` műveletet a sorok teljes számának lekéréséhez.
2. Generálj egy tartományt a Row count kimenet alapján, vagy használd közvetlenül a Row IDs kimenetet a ciklus bemeneteként.
3. Az előző megközelítéshez hasonlóan, iterálj végig a sorokon, nyerd ki és dolgozd fel az adatokat a `Get sheet cell` művelettel, majd frissítsd vagy jelöld meg az egyes sorokat a `Update sheet cell` művelettel.

> Megjegyzés: megadhatod a 2-t kezdő sorként a tartomány generálásakor, ha meg szeretnéd kímélni a táblázat fejléceit.

![Generate range Google Sheets](~/assets/docs/eggs/GenerateRange2.png)

- Egg letöltése: <a href="https://docs.blackbird.io/downloads/google_sheets_generate_range.json" download>Google Sheets Generate Range</a>

#### Iteráció sorokon keresztül tömbök használatával:
Ha több értéket kell kinyerned minden sorból, egyszerűsítheti a folyamatot, ha minden sort cellaértékek tömbjeként kezelsz. Ez a megközelítés hatékonyabb is, mivel kevesebb API-hívást igényel.

1. Használd a `Get used range` vagy `Get range` műveletet sorok készletének (vagy részhalmazának) lekéréséhez cellaértékek tömbjeiként.
2. Adj hozzá egy ciklust a tényleges Rows kimenettel bemenetként.
3. Használd a `Get entry by position` műveletet a Utilities alkalmazásból, hogy kinyerd az egyes oszlopok értékeit a tömbben elfoglalt pozíciójuk alapján (pl. a 3-as pozíció a C oszlopért).
4. Miután feldolgoztad az adatokat, frissítheted a cellát a `Update sheet cell` művelettel, összeállítva a cellacímet (a ciklusból származó Row ID segítségével és az oszlop megadásával)

![Iterate through range](~/assets/docs/eggs/IterateThroughRangeSheets.png)

Egy másik változat, egy részhalmaz és több oszlop bejegyzéseinek használata más műveletek bemeneteként:

![Iterate through range](~/assets/docs/eggs/IterateThroughRangeExcel.png)

- Egg letöltése: <a href="https://docs.blackbird.io/downloads/google_sheets_iterate_through_range.json" download>Google Sheets Iterate through Range</a>
- Egg letöltése: <a href="https://docs.blackbird.io/downloads/microsoft_excel_iterate_through_range.json.json" download>Microsoft Excel Generate Range</a>

### Oszlopértékek tömeges lekérése vagy frissítése
Egyes munkafolyamatokban szükség lehet tömeges frissítésekre vagy több érték lekérésére egy táblázat egy oszlopából. Rendelkezésre állnak bizonyos speciális műveletek, amelyek időt takarítanak meg azzal, hogy egyszerre dolgozzák fel az egész oszlopot, ahelyett, hogy soronként tennék.

#### Update Sheet Column
Amikor értékek listája vagy tömbje (pl. célnyelvi kódok vagy fájlnevek) áll rendelkezésre, amelyeket egy táblázat oszlopában szeretnél elhelyezni, az `Update sheet column` művelet megkönnyíti ezt. Ez a művelet bemenetként egy vagy több tömböt és/vagy egyedi értékek csoportját fogadhatja el. Ezek a táblázat megadott oszlopába kerülnek, egymás alá írva a megadott cellacímtől kezdve, megtartva azt a sorrendet, ahogyan a művelet bemenetében szerepeltek.

![Update Sheet Column](~/assets/docs/eggs/Update-sheet-column.png)

#### Get Sheet Column

Hasonlóképpen, szükséged lehet értékek halmazának lekérésére egy adott oszlopból későbbi felhasználásra. Használd a `Get column` műveletet az oszlop megadására (pl. C oszlop) és a kezdő és befejező cellák meghatározására (pl. 1-től 10-ig). A kimenet egy tömb lesz, amely tartalmazza a megadott oszloptartomány értékeit, amelyeket később felhasználhatsz a következő lépések bemeneteként.

![Get column](~/assets/docs/eggs/GetColumn.png)

## Eggs importálása

Egy Egg importálása a Nest-be:

1. Navigálj a Bird Editor részhez.
2. Kattints az Import gombra a jobb felső sarokban.
3. Válaszd ki az importálandó Egg (JSON) fájlt, és kattints az `Import` gombra.
4. Azonosítsd az újonnan létrehozott Bird-et, és kattints rá a szerkesztéshez.
5. Frissítsd a kapcsolat részleteit és bármilyen más szükséges bemeneti/kimeneti paramétert vagy kívánt lépést. Keresd a piros figyelmeztető jeleket a lépés neve mellett, amelyek hiányzó részletekre utalnak az adott lépésben.
6. Kattints a Mentés/Közzététel gombra.

![Importing Eggs](~/assets/docs/eggs/ImportEggs.gif)