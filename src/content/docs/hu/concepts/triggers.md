---
title: A triggerek megértése - Folyamatok és munkafolyamatok kezdeményezése
description: Ismerje meg, mik azok a triggerek.
sidebar:
  label: Triggerek
  order: 4
---

Minden folyamatnak valahol el kell kezdődnie: a **trigger** az, ami meghatározza, mikor kell egy munkafolyamatnak elindulnia, biztosítva, hogy a feladatok a megfelelő időben és a megfelelő feltételek mellett kerüljenek végrehajtásra. A Blackbird rendszerében négy típusú trigger létezik: manuális, ütemezett, esemény-alapú és lekérdezéses. Mindegyik típus egyedi célt szolgál és különböző forgatókönyvekhez illeszkedik.

## Manuális triggerek

A manuális triggereket (más néven [Manuális indítás](https://docs.blackbird.io/guides/manual-triggers/)) emberi beavatkozás aktiválja. Ezek a munkafolyamatok azonnal elindulnak, amint valaki a `Fly` gombra kattint. Ez a trigger típus ideális teszteléshez és hibakereséshez, vagy amikor a folyamatokat specifikus, gyakran kiszámíthatatlan feltételek alapján kell elindítani, amelyek emberi megítélést igényelnek. Ez a javasolt trigger típus, amíg a Birds-ek építésének folyamatában van.

![Fly gomb](../../../../assets/docs/triggers/Fly.gif)

**Főbb jellemzők**:

**Emberi kezdeményezés**: Egy személy szükséges a folyamat elindításához.
**Rugalmasság**: Lehetővé teszi a mérlegelést és döntést a folyamatok elindításában.
**Felhasználási esetek**: Munkafolyamatok tesztelése, ad-hoc feladat kezdeményezése.

## Ütemezett triggerek

Az ütemezett triggerek időalapúak, és előre meghatározott időközönként indítják el a folyamatokat. Ezek a triggerek tökéletesek olyan feladatokhoz, amelyeket rendszeresen és következetesen kell elvégezni, mint például a napi adatmentések vagy havi pénzügyi jelentések. Ezen feladatok kezdeményezésének automatizálásával az ütemezett triggerek biztosítják, hogy a folyamatok pontosan kerüljenek végrehajtásra, manuális beavatkozás nélkül.

A Blackbird-ben választhat egy intervallumot—a Bird közzétételének pillanatától kezdve, minden X óra vagy perc elteltével a Bird aktiválódik. Egy másik lehetőség, hogy a folyamatot naponta egy adott időpontban indítja, vagy mindig a hét/hónap egy meghatározott napján. Emellett megadhat egy időzónát is, hogy elkerülje a félreértéseket.

![Ütemezett](../../../../assets/docs/triggers/Scheduled.gif)

**Főbb jellemzők**:

**Időalapú**: Specifikus időpontokban vagy időközönként indítja a folyamatokat.
**Következetesség**: Biztosítja a feladatok rendszeres és időbeni végrehajtását emberi beavatkozás nélkül.
**Felhasználási esetek**: Időszakos jelentéskészítés, rutinszerű adatfeldolgozás, tartalom kinyerése a CMS-ből minden hétfőn a megállapodott határidőkor fordításra küldéshez.

## Esemény triggerek

Az esemény-alapú triggerek webhook-ok vagy callback-ek használatával reagálnak specifikus változásokra egy alkalmazásban. Ezek a triggerek rendkívül dinamikusak, és meghatározott feltételek aktiválják őket, mint például egy új e-mail érkezése, egy feladat teljesítése vagy adatváltozások. Az esemény-alapú triggerek elengedhetetlenek a valós idejű feldolgozáshoz és a reagáló munkafolyamatokhoz, ahol a folyamatok kezdeményezésének azonnal és specifikus eseményekhez kötötten kell történnie.

Miután kiválasztotta az Esemény típust, lépjen a Kapcsolat fülre vagy kattintson a Folytatás gombra, válassza ki az alkalmazást, amelyre reagálni szeretne, és a specifikus esemény típusát (pl. egy feladat teljesítése a TMS-ben, új e-mail az Outlook-ban, új megrendelés létrehozása a Plunet-ben). A Bird közzététele után, amint a kiválasztott művelet bekövetkezik, a munkafolyamat reagál a műveletre és elkezd végrehajtódni.

Az alábbi képen különböző eseményekre reagálhatunk, amelyek a Zendesk-ben történnek, például egy új cikk közzététele.

![Esemény](../../../../assets/docs/triggers/Event.png)

Amennyiben további beállításra van szükség (egyes alkalmazások ezt igénylik), előfordulhat, hogy egy URL-t kell másolni és beilleszteni valahová. Ilyen esetekben a részleteket az alkalmazás Blackbird dokumentációján belüli részében határozzák meg.

**Főbb jellemzők**:

**Esemény-vezérelt**: Specifikus rendszereseményekre vagy változásokra aktiválódik.
**Reagáló képesség**: Lehetővé teszi az eseményekre való valós idejű reagálást.
**Felhasználási esetek**: Valós idejű adatfrissítések, automatizált értesítések, feltételes feladat végrehajtás.

## Csoportosítás

Néha, ha minden egyes alkalommal reagálunk, amikor valami történik, az túl gyakori előfordulás miatt rendetlenséget okozhat. Itt jön képbe a Csoportosítás (Bucketing). Beállíthatja a Bird-et úgy, hogy a Blackbird összegyűjtse ezeket az eseményeket, és csak azután indítsa el, ha vagy X számú művelet történt, vagy egy meghatározott idő eltelt. Adja hozzá beállításait a Csoportosítás fülön.

Az alábbi képen, az előző példát folytatva, nem szeretnénk minden alkalommal új TMS projektet létrehozni, amikor egy cikket közzétesznek a Zendesk-ben. Ehelyett várunk, amíg legalább öt cikket tesznek közzé, vagy két óra eltelik, amelyik előbb bekövetkezik. Ha két óra után csak három cikket tettek közzé, a Bird így is végrehajtódik, és létrehoz egy új TMS projektet e három cikk számára. Ez a beállítás biztosítja, hogy a folyamatok kellően reagálóképesek legyenek anélkül, hogy túlzott forgalmat generálnának.

![Csoportosítás](../../../../assets/docs/triggers/Bucketing.png)

## Lekérdezés

Mivel egyes rendszerek nem rendelkeznek webhook-okkal vagy callback-ekkel, de szeretnénk gondosak és reagálóképesek lenni, a Blackbird bevezette a Lekérdezéses eseményeket. A normál felhasználó számára ez a trigger pontosan úgy néz ki, mint egy esemény-alapú, míg a háttérben a Blackbird meghatározott időközönként ellenőrzi a változásokat. Ez az ütemezett trigger típus egy alkalmazás adataiban keresi a frissítéseket annak eldöntésére, hogy elindítson-e egy munkafolyamatot, áthidalva a webhookokat nem biztosító alkalmazások közötti szakadékot, lehetővé téve Birds-eink számára, hogy _valós időben_ reagáljanak.

![Lekérdezés](../../../../assets/docs/triggers/Polling.gif)

## Ellenőrzőpontok

Ez az innovatív funkció lehetővé teszi a Bird-en belüli triggereket, lehetővé téve, hogy a Bird várjon egy specifikus esemény bekövetkezésére, mielőtt továbblépne a következő lépésekre. Az Ellenőrzőpontokról további információkat találhat a dedikált bejegyzésben [itt](https://docs.blackbird.io/concepts/checkpoints/).