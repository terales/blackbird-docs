---
  locale: hu
  title: Változásnapló
  description: A BlackBird alapplatform összes változtatásainak globális áttekintése
---
### (04-02-2025) 4.19
Fő funkciók: További Repülés oldal fejlesztések és egyéni alkalmazás feltöltési logika

##### Repülés oldal
- Javított a nagy méretű Repülések (16 MB-nál nagyobb adatmennyiség) megjelenítése.
- Különböző kisebb problémák javítása a Repülés oldalon.
- A Blackbird most automatikusan átirányít egy Repülésre, amikor a Bird szerkesztőben a 'Repülés' gombra kattintunk.
- Animáció jelenik meg, amikor egy kézi Repülés még sorban áll.
- Különböző szövegek egységesítése.

#### Egyéni alkalmazások
- Az egyéni alkalmazások mostantól minden Fészek számára láthatóak, függetlenül attól, hogy a felhasználó melyik Fészekben volt az alkalmazás feltöltésekor.

### (07-01-2025) 4.18
Fő funkciók: Repülés oldal átdolgozása

##### Repülés oldal
- Új státusz került hozzáadásra. A `Várakozás` azt jelzi, hogy a Bird a várakozási sorban van és hamarosan fel fog szállni.
- Egy repülő Bird animáció került hozzáadásra a Repülés oldalhoz, amely végigrepül a folyamaton jelezve, hogy hol tart a Repülés.
- Élő frissítés került hozzáadásra a Repülés oldalhoz. A Repülés oldal mindig a Repülés aktuális állapotát mutatja.
- A Repülés részletek szakasz frissítésre került különböző vizuális fejlesztésekkel.
- Különböző hibák javítása, amelyek korábban a tényleges Repülési adatok pontatlan ábrázolásához vezettek.
- Most már külön-külön megvizsgálhatja egy ciklus minden iterációját.
- Hozzáadásra került a 'Repülés leállítása' gomb, melyre kattintva csak ez a Repülés áll le, míg a többi továbbra is működik.
- Egy Repülés lista került hozzáadásra összecsukható oldalsávként. Tartalmazza ugyanazon Bird összes Repülését, amelyet éppen néz, a különböző Repülések közötti könnyű navigáláshoz.

##### Repülés áttekintő oldal
- Élő frissítés került hozzáadásra a Repülés áttekintő oldalhoz.
- A táblázat és a szűrők vizuális átdolgozáson estek át.
- Végtelen görgetési mechanizmus került hozzáadásra a Repülés áttekintő oldalhoz.

### (17-12-2024) 4.17
Fő funkciók: SAML, kezdőoldal és sok kisebb felhasználói felület frissítés

##### Bird szerkesztő
- Most már kiválaszthatja a `Hónap vége` opciót az ütemezett trigger Havi beállításban.
- Az 'Inputs' átnevezésre került 'Filters'-re minden eseménynél.
- A kiválasztható változók sorrendje megfordult. Most a legfelső változók a legördülő menüben azokból a műveletekből származnak, amelyek közelebb vannak ahhoz a helyhez, ahol van, nem pedig fentről lefelé haladva.
- A dinamikus beviteli értékek most már lehetővé teszik egyéni érték bevitelét is. Ez akkor hasznos, ha valamilyen okból a legördülő menü nem töltődik be.

#### Egyéb
- Egy súgó ikon hivatkozásokkal a dokumentációs cikkekhez került hozzáadásra az alkalmazás számos oldalán a bal alsó sarokban.
- Egyes gombok, fülek és beviteli mezők fejlettebb lebegési és interakciós állapotot kaptak.
- A vállalati felhasználók most már kérhetik SAML alapú SSO beállítását.
- Minden felhasználó most véletlenszerűen hozzárendelt Bird-et kap avatárként.
- Az érvénytelen kapcsolatok most világosabb hibaüzenetet mutatnak.
- A kezdőoldal új külsőt kapott cikkekkel, videókkal és gyors hivatkozásokkal.

##### Hibajavítások
- A 'varázspálca' összeállítható beviteli gomb most a megfelelő helyen jelenik meg a Firefox böngészőben.
- Az ellenőrzőpont aktiválása most megfelelően sikerül, ha a Bird-nek nem közzétett változtatásai vannak.
- Az azonos szinten lévő és azonos időtartamú késleltetett ellenőrzőpontok most közzétehetők.

### (22-11-2024) 4.16

Fő funkciók: háttérrendszer Repülés optimalizálások

##### Egyéb

- A Repülések most más struktúrában tárolódnak, ami lehetővé teszi a gyorsabb lekérdezésüket.

##### Hibajavítások

- Az Outlook ellenőrzőpont események most megfelelően aktiválhatók.
- A feliratkozás utáni esemény most működik az ellenőrzőpont aktiválása során.

### (01-11-2024) 4.15

Fő funkciók: Barátságosabb és informatívabb hibaüzenetek és SDK fejlesztések

##### Bird szerkesztő
- Most már megfelelően frissítheti a numerikus beviteli mezőket a 0 értékre.
- A kézi Bird-eket most ellenőrizzük teljességre és hiányzó beviteli értékekre.
- Az ütemezett triggerek minimális időköze most 5 perc.
- A nyomógomb engedélyezve van a kézi Bird újraközzététele után.
- A split operátor most úgy viselkedik, ahogy kell.
- A billentyűzetes navigáció a tömbök beviteli mezőiben most működik.
- A konvertálási és entitás kapcsolati operátorok most átnevezhetők.
- Az esemény aktiválás most kompatibilis az Outlook-kal.
- Ha egy művelet a művelet kihagyása opcióval két olyan ciklus között helyezkedik el, amelyek egy másik műveletből kapnak kimeneteket és egymásba vannak ágyazva... a Bird újra közzétehető :\).
- Az eszköztippek megfelelően bezáródnak, miután nagyon gyorsan mozgatja az egeret.
- A változtatások elvetése most a statikus legördülő menükben lévő változtatásokat is elveti.

##### Repülések
- Barátságosabb hibaüzenetek jelennek meg a Repülés oldalon, amelyek jelzik, hogy a rendszer melyik részében történt hiba. Ez segíti a felhasználót annak azonosításában, hogy ki a felelős.
- Néhány szélsőséges csoportosítási eset megoldásra került.

##### SDK
- Az események most fájlokat is kiadhatnak.
- A filemanager feltöltési módszer most visszaállítja a stream pozícióját.
- Az IApplication név attribútuma elavulttá vált.
- A bérlői azonosító hozzáadásra került a meghívási kontextushoz.
- Az adatkezelő visszatérési típusa most kiterjeszthető további információkkal.
- A kapcsolat definíciók most rendelkezhetnek statikus adatforrás kezelőkkel.

##### API
- A felfüggesztett Bird-ek most már nem aktiválhatók az API-n keresztül.
- Az API-ból lekért Repülés időtartam most pontosabb.
- Az API-ból lekért 'IsPublished' változó most mindig helyes.
- Az újrapróbálkozási szabályzat már nem okozza a Repülés sikertelen webhook többszöri hívását.

##### Egyéb
- A Bird importálási modal most megfelelően bezáródik egy JSON feltöltése után.
- Néhány szöveg, amely olyan hibákat jelenített meg, amelyek feketék voltak, most pirosak és megfelelően megjelennek.
- A könyvtár kimenetek most nem tartalmaznak extra \ jelet, ha a könyvtár érték tartalmazott egy "-t.
- A 'felhasználó hozzáadása' gomb többszöri kattintása már nem eredményez több felhasználó hozzáadását.

### (14-10-2024) 4.14

Fő funkciók: Ellenőrzőpontok 🎉

##### Bird szerkesztő
- Most már létrehozhat _ellenőrzőpontokat_ a Bird szerkesztőben. Az ellenőrzőpontok a BlackBird munkafolyamatokban olyan vezérlési lépések, amelyek lehetővé teszik a Bird-ek számára, hogy szüneteljenek és különböző eseményekre várjanak, mielőtt folytatnák Repülésüket. Az ellenőrzőpontokról [itt](../../concepts/checkpoints) olvashat többet.
- A trigger típus kiválasztása vizuális átdolgozáson esett át.
- A késleltetés funkció az operátoroktól átkerült az ellenőrzőpontok alatti trigger típusokhoz.

##### Egyéb
- A szabályok és Fészkek legördülő menü a felhasználó hozzáadásakor most akkor is működik, ha szűrte a listát.
- A Google-t és Microsoft-ot érintő eseményeket tartalmazó Bird-ek most megfelelően újra aktiválhatók felfüggesztés után.
- A lekérdezési információs szöveg most ismét megfelelően igazított.

### (24-09-2024) 4.13

Fő funkciók: Jobb kattintásos opciók, másolás, beillesztés és elemek duplikálása.

##### Bird szerkesztő
- Most már jobb kattintással az elemekre a Bird szerkesztőben megjeleníthet egy környezeti menüt. A három pontra is kattinthat a bal egérgombbal.
- A környezeti menüből most átnevezheti, kivághatja, másolhatja, duplikálhatja és törölheti az elemeket.
- A Bird szerkesztőben lévő + ikonra kattintva most beillesztheti a vágólapról a másolt elemeket.
- Az általános Bird opciók menü új megjelenést kapott.
- A BlackBird most tájékoztatni fogja, hogy engedélyezze a vágólapot a böngészőjében, ha ezt még nem tette meg.

##### Egyéb
- A konvertálási operátor most világosabban jelzi, ha helytelenül van konfigurálva.

### (18-09-2024) 4.12

Fő funkciók: A webhookok azonnal aktiválódhatnak feliratkozás után.

#### SDK
- Egy új interfész (`IAfterSubscriptionWebhookEventHandler`) került hozzáadásra az `OnWebhookSubscribedAsync()` metódussal. Ez a módszer közvetlenül a feliratkozás után hívódik meg, és használható a Repülések indítására ebben a pontban.

##### Hibajavítások
- A lekérdezett Repülések most megfelelően jelennek meg az új Fészkek Repülés oldalán.
- A művelet kihagyás engedélyezése bizonyos esetekben már nem akadályozza a Bird mentését.
- Az olyan folyamatoperátor után lévő műveletek, amely nem aktiválódik, most megfelelően végrehajtódnak.

##### Egyéb
- A fájlkezelő mag frissítésre került, hogy jobban működjön a WorldServerrel.

### (10-09-2024) 4.11

Fő funkciók: Folyamatoperátor fejlesztések és új összeállítható beviteli kifejezések.

##### Bird szerkesztő
- A "Repülés befejezése" operátor mindenhol elérhető a Bird-ben. A "Repülés befejezése" operátor leállítja a Repülést, amikor eléri.
- A "Ciklus befejezése" operátor kilép a ciklusból, amikor eléri. Ez a ciklusokban érhető el.
- A "Repülés befejezése" és a "Ciklus befejezése" opcióként feltételhez kötött beviteli mezővel is rendelkezik, így nem mindig kell döntésbe helyezni őket.
- A felhasználó most szövegeket állíthat össze bármely szöveges beviteli mezőben, amelyhez nincs beviteli kezelő (legördülő) definiálva, a kurzor felett lévő varázspálca gombra kattintva.
- A Bird szerkesztőben a "+" gombra kattintáskor megnyíló modal át lett tervezve.
- Barátságos üzenet került a compose operátorhoz, hogy emlékeztesse az embereket, hogy most már használhatják az új szövegbeviteli kifejezés funkciót.

##### Hibajavítások
- A \ már nem duplikálódik \\ formában az egyéni bevitelekben.
- A numerikus lista a compose operátorban már nem töri meg a Bird-et.
- Számos probléma megoldása a .csv fájlok egyéni könyvtárakba történő importálása körül.
- A Repülések most megfelelően eltávolításra kerülnek a munkafolyamat-motorunkból a leiratkozáskor, még akkor is, ha a Repülések egyszerre érkeztek.
- A Repülés oldalon hiányzó Repülések most megjelennek.
- Megoldódott egy szélsőséges eset, amely nem tette lehetővé a Bird módosítások mentését.

### (26-08-2024) 4.10 

Fő funkciók: Egyéni kapcsolat gombok és szervezet létrehozási automatizálások.

##### SDK
- Hozzáadva a kapcsolati modálok HTML-jének testreszabási lehetősége HTML sablonok SDK-ban való támogatásával.
- Több kapcsolódó dinamikus beviteli mező is elérhető az eseményekben.
- Az alkalmazásnevek és -leírások most frissülnek, amikor új alkalmazásverzió kerül feltöltésre