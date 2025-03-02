---
title: Deploying Your App
description: Ismerje meg, hogyan telepíthet Blackbird alkalmazást.
sidebar:
  label: Alkalmazás telepítése
  order: 2
---

Az SDK segítségével létrehozott Blackbird alkalmazásokat telepítheti saját Blackbird szervezetéhez _egyéni alkalmazásként_. Ez az útmutató a Visual Studio 2022 használatát feltételezi.

## Közzététel

Mielőtt telepítene egy alkalmazást, győződjön meg arról, hogy legalább tartalmaz egy olyan osztályt, amely implementálja az `IApplication` interfészt (és opcionálisan az `ICategoryProvider` interfészt), egy osztályt, amely implementálja az `IConnectionDefinition` interfészt, és egy osztályt, amely implementálja az `IConnectionValidator` interfészt. Ha az alkalmazásnak vannak műveletei, akkor győződjön meg arról, hogy a műveleteket implementáló osztályok rendelkeznek az `[ActionList]` attribútummal. Ha vannak eseményei, győződjön meg arról, hogy az esemény osztályai rendelkeznek a `[WebhookList]` vagy `[PollingEventList]` attribútummal.

1. Kattintson jobb gombbal a projektjére a megoldáskezelőben, és kattintson a _Publish_ (Közzététel) gombra

![connection](~/assets/docs/publishing.png)

2. Ha még nem hozott létre közzétételi profilt, hozzon létre egy közzétételi profilt, amely helyi mappába publikál.
3. Kattintson a _Publish_ (Közzététel), majd az _Open folder_ (Mappa megnyitása) gombra
4. Hozzon létre egy `.zip` archívumot, amely tartalmazza az **összes** fájlt ebben a mappában

> **Megjegyzés: Ha Mac gépen dolgozik, győződjön meg arról, hogy törli a rejtett _\_MACOSX_ mappát a zip archívumból, mielőtt feltöltené a Blackbird-re.**

![zipping](~/assets/docs/zipping.png)

## Feltöltés

Ha új alkalmazást szeretne létrehozni, lépjen az _Apps_ -> _My custom apps_ menüpontra -> Kattintson a _Create app_ gombra. Töltse fel a `.zip` fájlt a második lépésben.

Ha meglévő alkalmazást szeretne frissíteni, kattintson a frissíteni kívánt alkalmazáson a _New version_, majd az _Update App_ gombra. Töltse fel a `.zip` fájlt a felugró képernyőre, majd kattintson az _Update_ gombra.

> Megjegyzés: Alkalmazás frissítésekor győződjön meg arról, hogy az alkalmazás új verziója (a `.csproj` fájlban meghatározva) magasabb, mint a meglévő verzió.

![zipping](~/assets/docs/upload.png)