---
locale: hu
title: Alkalmazás konvenciók
description: Használja a több mint 100 alkalmazás és integráció építésével szerzett tudásunkat.
sidebar:
  label: Alkalmazás konvenciók
  order: 9
  hidden: false
---

Mint tudja, a Blackbird alkalmazások kis termékekként tekinthetők, ahol minden esemény, művelet és legördülő menü egy szándékos felhasználói élményt nyújt, amelynek célja a munkafolyamatok lehető legegyszerűbb létrehozása. Több mint 100 alkalmazást és integrációt építettünk, és ez idő alatt megtanultuk, milyen szabványokat és konvenciókat kell betartani a könnyű és következetes felhasználói élmény biztosítása érdekében. Az alább található konvenciókat minden Blackbird nyilvános alkalmazásra alkalmazzuk (ahol lehetséges), és értékes forrásként szolgálhatnak Önnek, amikor saját alkalmazásait építi.

## 1. Típusok

A Blackbird-ben a felhasználók az alábbi 5 alaptípussal találkozhatnak: szöveg (string), szám (bármilyen numerikus típus a .NET-ben), dátumok [(`DateTime`)](https://learn.microsoft.com/en-us/dotnet/api/system.datetime?view=net-8.0), fájlok [(`FileReference`)](../../sdk/files) és logikai értékek. Ezenkívül a felhasználó találkozhat a fentiek "többszörös" verzióival is, amelyeket az SDK-ban `IEnumerable<string>`, `IEnumerable<FileReference>` stb. jelöl.

### 1.1 - ID típusok

Egyes alkalmazások az azonosítókat (ID-kat) egész számként, mások hosszú egész számként, megint mások karakterláncként kezelik. **A Blackbird-ben minden ID-jellegű változót karakterláncként (string) kezelünk**. Ez azt jelenti, hogy bármilyen azonosító jellegű változót karakterlánccá kell konvertálni és karakterláncból vissza. Ennek oka, hogy ha egyes alkalmazások az azonosítókat számként, mások pedig karakterláncként kezelik, nem tudjuk biztosítani az együttműködési képességet az azonosítók más helyeken történő mentésekor. Például ha egy azonosítót egyéni mezőben szeretne menteni, általában csak karakterlánc típusokat tud elmenteni. Ezért az ebből az egyéni mezőből kinyert érték nem lenne kompatibilis egy numerikus azonosító bevitellel. Másodszor, senki sem végezhet aritmetikai műveleteket az azonosítókon.

> ⚠️ Figyelem - a [System.Text.Json (alapértelmezett RestSharp deszerializáló)](https://learn.microsoft.com/en-us/dotnet/standard/serialization/system-text-json/migrate-from-newtonsoft?pivots=dotnet-6-0#non-string-values-for-string-properties) alapértelmezés szerint nem deszerializál int, float stb. típusokat karakterlánccá.

### 1.2 - Dátum típusok

A dátumokat sok alkalmazásban használják. Azonban egyetlen alkalmazás sem következetes abban a formátumban, amelyet a dátumok megjelenítésére használ. **A Blackbird-ben minden, ami dátumot jelöl, [`DateTime`](https://learn.microsoft.com/en-us/dotnet/api/system.datetime?view=net-8.0) típusúvá kell konvertálni**. Legyen szó akár egy "létrehozva" mezőről, akár egy határidőről. Győződjön meg arról, hogy a dátumai DateTime típusúak, nem pedig karakterláncok vagy hosszú egész számok. Ez az egyetlen módja annak, hogy az alkalmazások együttműködhessenek.

### 1.3 - Tömb típusok

A Blackbird felhasználói felületén "többszörös" néven is ismert. A tömbök természetesen az egyéb primitív típusok vagy egy összetett osztály objektum gyűjteményét jelölik. Összetett osztály objektum visszaadásakor vegye figyelembe, hogy ezen a típusú struktúrán nem lehet fejlett műveleteket végrehajtani. A tömb típusok esetében a legfontosabb szabály, hogy **soha ne adjon vissza null értéket, mindig üres tömböket adjon vissza**, még akkor is, ha az alapul szolgáló API szívesen ad vissza null értéket. Ez csökkenti a null referencia hibák valószínűségét a Blackbird felhasználói élményben.

## 2. Elnevezés

**Minden hitelesítési adatnak, műveletnek, (webhook) eseménynek, bemeneti paraméternek és kimeneti paraméternek felhasználóbarát, leíró rövid névvel kell rendelkeznie.** Ha a leíró név nem elegendő, akkor hosszabb leírást lehet hozzáadni, amely felugró ablakként jelenik meg a Blackbird felhasználói felületén.

> **💡 Tipp**: A [Display()] attribútumot szinte bármire használhatja, hogy nevet és opcionális leírást adjon neki.

A felhasználói felületen megjelenő minden nevet gondosan kell megválasztani, tökéletesen tükröznie kell a műveletet/eseményt/paramétert, és a leírásban bármilyen fontos további információt tartalmazhat. Az elnevezési konvenciók vonatkoznak a műveletek neveire, műveletek leírásaira, tulajdonságok megjelenítési neveire, adatforrásokra és kapcsolati tulajdonságokra.

### 2.1 - Nagybetűhasználat

**Minden név első szavát nagybetűvel kell kezdeni. A többi szót nem kell nagybetűvel írni**. Például:

> ❌ Create Draft Message

> ✅ Create draft message

Kivéve a rövidítéseket. **Minden rövidítést teljesen nagybetűvel kell írni**. Tehát ID és nem Id, URI és nem uri.

> ❌ Project id

> ✅ Project ID

### 2.2 - Azonosítók (ID-k)

Egy ideig elhagytuk az "ID" szót az olyan bemeneti/kimeneti változókból, amelyek valójában azonosító paraméterek voltak, és inkább csak annak neveztük, ami volt: Project, Translation, Task. Ez hiba volt. A felhasználó számára nem világos, mit jelent a paraméter, és gyakran összetévesztették például a fordítás tartalmával. **Minden olyan változónak, amely azonosító, tartalmaznia kell az ID szót**. Továbbá, **soha ne nevezzen egy paramétert egyszerűen "ID"-nak, mindig legyen konkrétabb**, például "Company ID".

> ❌ ID

> ❌ Translation

> ✅ Translation ID

### 2.3 - Nevek hossza

A madár szerkesztőben a neveknek nincs túl sok helyük. Ezért **a tulajdonságok és műveletek neveinek viszonylag tömörnek kell lenniük**. Alapszabályként a nevek **ne legyenek hosszabbak ~40 karakternél**.

> ❌ Add business phone number to contact's business details

> ✅ Update contact

## 3. Hibák

**Mindig leíró és végrehajtható hibaüzeneteket akarunk biztosítani a felhasználóknak**. Felhasználóink lehetnek nem technikai jellegűek, és a lehető legjobban segíteni akarjuk őket. Különösen az olyan hibák esetén, amelyekkel kapcsolatban a felhasználó tehet valamit, például amikor hibás változót ad meg, amikor a hitelesítési adatai helytelenek, vagy amikor a rendszerük rosszul van konfigurálva.

### 3.1 - Hibák megjelenítése

A Blackbird-ben a hibákat egyszerűen kivételekként dobják, és a Blackbird a kivétel üzenetét megjeleníti a felhasználóknak, amikor a repülést megvizsgálják. A `throw new Exception("A hibaüzenetem ide kerül")` használatakor a hibaüzenet megjelenik a felhasználónak. Azonban előnyben részesítjük, hogy mindig kiküszöböljük a szokásos kivételeket, amelyeket a felhasználó lát. Ehelyett a `PluginMisconfigurationException` és a `PluginApplicationException` kivételosztályokat kell használni. A részletes leírásért olvassa el a [hibák oldalt](../../sdk/errors).

A jó felhasználói élmény érdekében **el kell kapni a hibákat, és amikor részletes leírás lehetséges, ezt a leírást meg kell jeleníteni**. És **egy konfigurációs hibának mindig tájékoztatnia kell a felhasználót arról, hogyan javíthatja a problémáját**.

### 3.2 - Aránylimitek

Szinte minden API-nak van beállított aránylimit szabályzata. Ez az aránylimit gyakran megtalálható az API dokumentációjában. Az alkalmazásfejlesztő feladata annak biztosítása, hogy az aránylimit hibák ne jussanak el a Blackbird felhasználóhoz a művelet szintjén. Ez azt jelenti, hogy **az aránylimitekkel foglalkozni kell** az aránylimit hibaválaszok azonosításával (néha ezeket a válasz fejléceihez adják hozzá) és a feladat szüneteinek bevezetésével, hogy lelassítsa a kód által végrehajtott kérések számát.

## 4. Kapcsolatok

A Blackbird kapcsolatok bármilyen mennyiségű "kapcsolat definíciós mezővel" definiálhatók. Ezenkívül lehetőség van speciális OAuth2 kapcsolatok beállítására is. Az OAuth2 hihetetlen felhasználói élményt biztosít. Nevezetesen, lehetővé teszi felhasználóink számára, hogy egyetlen kattintással csatlakozzanak a Blackbird-höz. **Ha lehet, mindig OAuth2-t akarunk használni**, és elkerülni, hogy a felhasználóinknak kliens azonosítókat, kliens titkokat, engedélyeket stb. kelljen megadniuk.

Másodszor, vegye figyelembe, hogy a kapcsolati mezők szintén rendelkezhetnek megjelenítési névvel, leírással és opcionális érzékeny paraméterrel. **A jelszavaknak és API kulcsoknak a `Sensitive = true` jelzéssel kell rendelkezniük**, amelyek így jelszóként jelennek meg a Blackbird-ben.

A kapcsolati mező neveknek rövidnek, leírónak és egyértelműnek kell lenniük. A mező nevéből a felhasználónak ki kell tudnia találni, hogy pontosan milyen adatot kérnek tőle.

![Kapcsolat definíció](~/assets/docs/conventions/connection_fields.png)

![Kapcsolat részletek](~/assets/docs/conventions/connection_details.png)

## 5. Adatforrások

Sok műveleti bemeneti paraméter csak bizonyos számú bevitelt engedélyez. A felhasználók kényelme és általános élménye érdekében lehetővé tesszük olyan adatforrások meghatározását, amelyek közlik a Blackbird-del, hogy milyen értékek engedélyezettek, és a felhasználó ezek közül választhat.

### 5.1 - Statikus adatforrások

A statikus adatforrásokat olyan változókhoz tervezték, amelyek előre definiáltak és végesek. Ez bármilyen felsorolt típust, felsorolt típusokat képviselő azonosítókat, konfigurált nyelveket stb. jelent. Ahelyett, hogy a felhasználónak találgatnia kellene, milyen értékeket vár az API, **mindig statikus adatforrásokat kell használnunk olyan bemeneteknél, amelyeknek véges számú lehetséges opciója van, amelyeket előre meg lehet határozni**. A statikus adatforrások példái:

- Státuszok, projektekhez vagy feladatokhoz egy TMS-ben vagy projektmenedzsment alkalmazásban.
- Nyelvek, amikor a bemeneti paraméter egy forrás/célnyelv, és az alkalmazás nem engedi saját nyelvek konfigurálását.

### 5.2 - Dinamikus adatforrások

A [dinamikus adatforrásokat](../../sdk/datasources/#dynamic-data-sources), ahogy a szó is sugallja, akkor használjuk, amikor az adatokat a kapcsolatból kell betölteni. A dinamikus adatforrások klasszikus példái:

- Projektek, amikor a bemeneti paraméter egy Project ID egy TMS alkalmazásban.
- Csatornák, amikor a bemeneti paraméter egy Channel ID a Slack-ben.
- Nyelvek, amikor a bemeneti paraméter egy forrás/célnyelv, és a nyelvek az alkalmazásban vannak konfigurálva.
- Mappák, fájlkezelési műveleteknél, amikor kiválasztja, hová kell frissíteni/letölteni a fájlokat.

**Minden olyan bemeneti paraméternek, amelynek véges számú lehetséges értéke van, de amely a felhasználó kapcsolatától függ, dinamikus adatforrással kell rendelkeznie**.

Néha az adatforrás adatainak betöltéséhez több információra van szükség a felhasználótól. Ennek példája lehet egy olyan struktúra, ahol a projekteknek több feladatuk lehet. Ahhoz, hogy a projekt összes feladatához dinamikus legördülő menüt mutassunk, az API-nak és az alapul szolgáló kódnak először a Project ID-re van szüksége. Ezekben az esetekben [fejlett kontextusú dinamikus adatforrásokat](../../sdk/datasources/#advanced-context) kell használnia. Legyen azonban nagyon körültekintő a fejlett kontextusok használatakor, mivel vannak esetek, amikor azt gondolná, hogy a fejlett kontextus hasznos lenne, miközben valójában megakadályozza a felhasználót a munkafolyamat felépítésében. Ennek példája egy legördülő menü a nyelvi információk hozzáadásához egy fájl feltöltésekor. Úgy tűnhet, hogy jó ötlet a projekten k