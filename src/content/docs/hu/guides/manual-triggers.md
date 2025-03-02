---
title: Kézi Push használati esetek
description: Különböző használati esetek, ahol a Madarak kézi indítása teljesen észszerű
sidebar:
  label: Kézi Push
  order: 10
  hidden: false
---

A kézi indítók (más néven kézi push) hatékony megoldást kínálnak olyan munkafolyamatokhoz, amelyek rugalmasságot és emberi beavatkozást igényelnek. Az automatizált folyamatokkal ellentétben a kézi indítók lehetővé teszik a felhasználók számára, hogy egy munkafolyamatot pontosan akkor indítsanak el, amikor szükséges, a Reptetés gombra kattintva. Ez a funkció különösen hasznos minden olyan felhasználó számára, akinek konkrét feltételek vagy emberi megítélés alapján kell feladatokat indítania. Akár új Madarak tesztelésére, munkafolyamatok hibakeresésére vagy egyszeri projektek kezelésére használja, a kézi indítók lehetővé teszik a folyamatok időzítésének és indításának irányítását, biztosítva, hogy a feladatok akkor induljanak el, amikor Ön készen áll.

![Fly gomb](~/assets/docs/triggers/Fly.gif)

A kézi indítók egyik fő előnye az általuk kínált rugalmasság. Ahelyett, hogy merev, ütemezett munkafolyamatokhoz lenne kötve vagy arra várna, hogy egy esemény bekövetkezzen, igény szerint aktiválhatja a folyamatokat, így ideálisak olyan helyzetekben, ahol előre nem látható körülmények emberi mérlegelést igényelnek. Ez a kézi indítást tökéletes választássá teszi egy munkafolyamat fejlesztési szakaszában. Ahogy építi és finomítja Madarait, a kézi indítás lehetővé teszi, hogy különböző elemeket teszteljen anélkül, hogy ütemezett vagy esemény által kiváltott indításra várna, valós idejű visszajelzést biztosítva és segítve a zökkenőmentes folyamat biztosítását a teljes automatizálás alkalmazása előtt.

A kézi indítók a lokalizáció és tartalomfeldolgozás területén is kiválóak. Például amikor egy nyelvi szolgáltató új ügyféllel vagy projekttel kezd dolgozni, gyakran szükség van számos meglévő vagy örökölt tartalom fordítására vagy feldolgozására egyszeri jelleggel. A kézi indítók lehetővé teszik, hogy beállítsa a szükséges szűrőket abban az alkalmazásban, amelyből a tartalom származik, például dátumtartományokat vagy tartalomkategóriákat, majd egyetlen kattintással kivonja és elküldje azokat platformjára vagy TMS-ébe. Ez zökkenőmentes, hatékony folyamatot biztosít, mielőtt átállna a folyamatos lokalizációs szolgáltatásokra.

### Példa

![Sitecore](~/assets/docs/triggers/Sitecore_DownloadItems.png)

A fenti kép egy olyan Madarat mutat, amely egy nagy csoport, meghatározott kritériumoknak megfelelő Sitecore oldalt visz át egy TMS-be (ebben az esetben Trados-ba). Amint a felhasználó a Reptetés gombra kattint - a kézi indítóra - a munkafolyamat elindul. A Madár megkeresi az összes Sitecore oldalt, amelyek 2024. január 1. után jöttek létre és publikáltak. Az opcionális bemeneti szűrők segítségével testre szabhatók a keresési kritériumok, így könnyen módosíthatók igény szerint. Ezek a szűrők segítenek azonosítani, hogy mely oldalakat kell letölteni. A munkafolyamat következő lépései létrehoznak egy projektet a Trados-ban, lekérik a Sitecore oldalakat HTML fájlokként, letöltik, majd feltöltik a frissen létrehozott Trados projektbe fordítási forrástartalmakként. Ez a munkafolyamat a Reptetés gombra kattintva szükség szerint többször is végrehajtható, bár egy végrehajtás is elegendő lehet ahhoz, hogy az összes szükséges tartalmat lehúzza fordításra és átnyomja a választott TMS-be.

> További információkat a kioldókról [itt](https://docs.blackbird.io/concepts/triggers/) talál.