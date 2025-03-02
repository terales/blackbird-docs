---
title: Az eszköztár - Különböző segédeszközök a repüléseid megkönnyítésére
description: Ebben az útmutatóban különböző műveleteket tekintünk át a Blackbird előre beépített alkalmazásaiból, amelyek segítenek az adatok kinyerésében vagy átalakításában, amelyek gyakran elengedhetetlenek munkafolyamataidhoz.
sidebar:
  label: Az eszköztár
  order: 6
  hidden: false
---

Amikor egy munkafolyamatban különböző alkalmazások között navigálsz, előfordulhat, hogy extra műveletekre van szükséged az adatok többféle módon történő átalakításához. Itt találsz néhány Blackbird eszközt, amelyek segítenek neked sikerrel járni.

## Utilities alkalmazás

A [Utilities](https://docs.blackbird.io/apps/utilities/) alkalmazás számos műveletet kínál az adatok kezeléséhez. Íme néhány példa:

- Dátumok: 
    - Létrehozhatsz dátumot (pl. mai napot) és hozzáadhatsz/kivonhatsz belőle napokat (figyelembe véve vagy figyelmen kívül hagyva a munkanapokat). Ez nagyon hasznos lehet határidők beállításához vagy dinamikus dátumok létrehozásához adatlekérdezéshez. A dátumokat különböző formátumokban is formázhatod.
- Fájlok: 
    - Kinyerheted egy fájl nevét, sőt meg is változtathatod - például hozzáfűzheted a fordítás nyelvének nevét a fájl nevéhez. 
    - Kinyerheted a fájl kiterjesztését is, ami nagyon hasznos lehet, ha különböző típusú fájlokat különböző útvonalakra kell irányítanod. 
    ![Fájl kiterjesztés lekérése](~/assets/guides/toolbox/Toolbox_1.png)
    - Megszámolhatod a szavak vagy karakterek számát egy fájlban. Ha nyomon kell követned, hány karakter kerül elküldésre a gépi fordító motorodba, mert ez alapján számolnak fel díjat, akkor ez értékes adat lehet, amit érdemes kinyerni és rögzíteni. 
- Szöveg:
    - Lehetőség van a szavak és karakterek számlálására a szöveges formátumokban is. Tehát ha üzenetet veszel át a Slack-ből vagy Teams-ből, vagy tudni szeretnéd, milyen hosszú egy fájlnév, használhatod a Utilities műveleteit ezek számolására.
    ![Szöveg karakterszáma](~/assets/guides/toolbox/Toolbox_2.png)
    - Reguláris kifejezéseket használhatsz tartalom kinyerésére vagy cseréjére a szövegből. Tartalom kinyerésekor opcionális paraméterként megadhatod, hogy melyik csoportot szeretnéd konkrétan kinyerni. Vagy használhatsz csoportosítást a csere művelettel a szöveg részeinek átrendezéséhez. Ezekkel a lehetőségekkel kinyerhetsz e-mail címeket egy üzenetből vagy nyelvkódok listáját egy e-mail törzsből. 
    ![Kinyerés regex segítségével](~/assets/guides/toolbox/Toolbox_3.png)
- Számtartomány:
    - Kezdő- és végpont megadásával számtartományt generálhatsz. Ez különösen hasznos a Loop (Ciklus) kombinálásával, amikor egy műveletet X-szer kell ismételni. Egy jó felhasználási példa egy táblázat sorainak végigiterálása (gondolj a Microsoft Excelre), ahol információt gyűjtesz az A oszlopból, feldolgozod, majd az eredményt a B oszlopba illeszted. Ebben az esetben a tartomány számait használhatod a sorszám jelölésére.
    ![Tartomány és Excel](~/assets/guides/toolbox/Toolbox_4.png)
- Tömbök:
    - Szintén hasznos lehetőségek állnak rendelkezésre tömbökkel vagy elemcsoportokkal való munkához. Az "Array Contains" (Tömb tartalmazza) művelettel ellenőrizheted, hogy egy érték szerepel-e a tömbben vagy sem, és ez alapján hozhatsz döntéseket. Például, ha egy ügyfeledről kiderül, hogy nem szerepel a kapcsolatok listáján, hozzáadhatod anélkül, hogy duplikátumokat hoznál létre. 
    - Ha már a duplikátumokról beszélünk, létezik egy művelet, amely egyedi értékek listáját adja vissza egy tömb bemenetből. 
- Scraping (Webes tartalom kinyerése):
    - Nyers és formázatlan weboldalak tartalmát nyerheted ki egy URL-ből. Megadhatsz XPATH-t is a kinyerni kívánt tartalom pontos meghatározásához. Ez különösen hasznos, ha egy weboldal tartalmát szeretnéd felhasználni, de nincs hozzáférésed a CMS-hez vagy a forráskódhoz.
    ![Scraping + összefoglalás](~/assets/guides/toolbox/Toolbox_5.png)

- XML fájlok:
    - Ha XML fájlokkal dolgozol, szükséged lehet egy adott tulajdonság értékének kinyerésére, megváltoztatására, vagy akár a verzió tulajdonság frissítésére. Ezek mind lehetségesek. 
    - 
- Szöveg fájlokká és fájlok szöveggé alakítása:
    - Ha a fájlod docx/doc, pdf vagy txt formátumú, akkor megnyitható és a tartalom kinyerhető. Ez különösen hasznos, ha ezt a tartalmat egy olyan AI modellnek szeretnéd elküldeni, amely nem fogad fájlokat. Az ellenkező irány is működik, a sima szöveg doc/docx vagy txt fájllá alakítható. Tehát ha szöveges kimenetet kapsz az A alkalmazástól, és a B alkalmazás (valószínűleg egy fordítási menedzsment rendszer) csak fájlokat fogad el, a "Convert text to document" (Szöveg dokumentummá alakítása) művelet segít zökkenőmentessé tenni ezt az átmenetet. 

## Blackbird Prompts alkalmazás

Ez az alkalmazás előre megtervezett promptok gyűjteményét tartalmazza, amelyek különböző AI alkalmazásokkal kombinálva használhatók. Ezek a promptok sikeresnek bizonyultak a nyelvi műveletek során. A lista tartalmaz promptokat fordítási problémák azonosítására, szövegek összefoglalására, fordítási jelentések készítésére, utószerkesztésre és még sok másra. 

![Promptok listája](~/assets/guides/toolbox/Toolbox_6.png)

## HTTP alkalmazás

Ez az alkalmazás lehetővé teszi az alapvető HTTP kérések (GET/POST/PUT/PATCH/DELETE) végrehajtását egy adott végponthoz, és a fájlok letöltését is. 

## String operátorok

Amikor a plusz jelen keresztül hozzáadsz egy műveletet, választhatod helyette egy operátor hozzáadását is. A string operátor nagyon hasznos és népszerű, mivel érdekes lehetőségeket kínál.

![Operátorok](~/assets/guides/toolbox/Toolbox_7.png)

- String Compose (Szöveg összeállítás): Ez a lehetőség lehetővé teszi egy üzenet összeállítását, akár gépelés útján, akár korábbi műveletek kimeneteit felhasználva, vagy mindkettőt többszörösen kombinálva. Ez a rendkívül hatékony eszköz lehetővé teszi például olyan üzenet létrehozását, hogy a cikk + _a cikk neve_ + publikálva lett a + _az URL érték_ + oldalon + _a nyelven, amire lefordították_.

![Üzenet összeállítása](~/assets/guides/toolbox/Toolbox_8.png)

- String Split (Szöveg felosztás): Egy szövegből, például egy szöveges formátumú elemlistából, megadhatod az elválasztót, és cserébe egy valódi listát kapsz, amelyen végigitarálhatsz, és minden elemet külön kezelhetsz. 

Végül, ha bármilyen módon módosítani szeretnéd ezeket az _apps_-okat (például saját ismétlődő promptot szeretnél hozzáadni a Blackbird Prompts-hoz, vagy módosítani a HTTP alkalmazást hitelesítés vagy specifikus paraméterek hozzáadásával), klónozhatod a kódot a Github-ról, ahol a [nyílt forráskódú kódunk található](https://github.com/orgs/bb-io/repositories), elvégezheted a szükséges módosításokat és újra telepítheted a testre szabott alkalmazásodat a Blackbird-re (Apps > Custom apps > Create app). További részleteket [itt](https://docs.blackbird.io/sdk/deploying/#uploading) találsz. Ezek az egyéni alkalmazások csak azokban a nest(ek)ben lesznek elérhetők, amelyekbe feltöltöd őket. 

Most, hogy végigolvastad ezt az útmutatót, és ezek a lehetőségek a rendelkezésedre állnak, az égig ér a lehetőségek tárháza. Terjeszd ki a szárnyaidat, fedezz fel, és engedd szabadjára a kreativitásodat. Ha segítségre van szükséged vagy hiányzik egy funkció, ne habozz kapcsolatba lépni velünk. Boldog Repülést!