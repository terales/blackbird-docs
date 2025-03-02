---
title: Setting Up a Blackbird Project
description: Ismerje meg, hogyan hozhat létre Blackbird projektet a Blackbird SDK használatával.
sidebar:
  label: Projekt beállítása és alkalmazások klónozása
  order: 1
---

Használja kedvenc IDE-jét egy .NET osztálykönyvtár létrehozásához a projekt indításához. Ezután telepítse az SDK-nkat a NuGet segítségével. Az SDK-nk linkjét [itt](https://www.nuget.org/packages/Blackbird.Applications.Sdk.Common) találja, vagy keressen rá a 'Blackbird' kulcsszóra a NuGet csomagkezelőben. Ez az útmutató bemutatja a lépéseket a Visual Studio 2022 for Windows használatával. Alternatívaként létrehozhat Blackbird alkalmazást egy sablonból is.

## Előfeltételek

- Telepített Git a helyi gépen. Ehhez az oktatóanyaghoz feltételezzük, hogy alapvető ismeretekkel rendelkezik a Git használatáról (ha sablonból indul).
- Telepítse a Visual Studio for Windows-t a .NET desktop development munkaterülettel. [Letöltheti](https://visualstudio.microsoft.com/) és telepítheti a 2022 Community kiadást ingyenesen, vagy használhatja a Professional vagy Enterprise kiadást. Alternatívaként használhat bármilyen más .NET IDE környezetet, mint például a Rider vagy a VS Code a szükséges bővítményekkel.
- .NET 8 (vagy újabb) telepítve a gépére.

## Nulláról kezdve

### Projekt létrehozása

1. A Visual Studio-ban válassza a _Fájl > Új > Projekt_ menüpontot.
2. Az _Új projekt létrehozása_ ablakban írja be az _Osztálykönyvtár_ kifejezést a keresőmezőbe, és válassza a _C#_ lehetőséget a legördülő listákban. Az eredményül kapott projektsablonok listájából válassza az _Osztálykönyvtár_ lehetőséget, majd kattintson a _Tovább_ gombra.
3. Az _Új projekt konfigurálása_ ablakban frissítse a _Projekt nevét_ és a _Megoldás nevét_, majd kattintson a _Tovább_ gombra.
4. Válassza a .NET 8.0 (vagy a legújabb verziót) a _Keretrendszer_ számára a _További információk_ ablakban, majd kattintson a _Létrehozás_ gombra.

A Visual Studio létrehozza a projektet, amely megjelenik a Megoldáskezelőben.

### SDK hozzáadása

A projekt formátumától függően a NuGet csomag telepítése a függőséget vagy a projektfájlban, vagy egy _packages.config_ fájlban rögzíti. További információt a Csomag használati munkafolyamat részben találhat.

A `Blackbird.Applications.Sdk.Common` csomag telepítéséhez a NuGet Package Manager használatával a Visual Studio-ban kövesse az alábbi lépéseket:

1. Válassza a _Projekt > NuGet csomagok kezelése_ menüpontot.
2. A _NuGet Package Manager_ oldalon válassza a _nuget.org_ lehetőséget a _Csomagforrás_ számára.
3. A _Böngészés_ fülön keressen rá a _Blackbird.Applications.Sdk.Common_ kifejezésre, válassza ki a `Blackbird.Applications.Sdk.Common` csomagot a listából, majd kattintson a _Telepítés_ gombra.
4. Amikor a rendszer kéri a telepítés megerősítését, kattintson az _OK_ gombra.

![nuget](../../../../assets/docs/nuget.png)

## Sablon alapján

Klónozza a [sablon alkalmazás repozitóriumát](https://github.com/bb-io/TemplateApp) a parancssorból a következő paranccsal:

```bash
git clone https://github.com/bb-io/TemplateApp.git
```

Nyissa meg a solution fájlt és fedezze fel a projektet

## Klónozás meglévő alkalmazásból

Klónozza annak az alkalmazásnak a repozitóriumát, amelyet módosítani szeretne. A Blackbird összes repozitóriumát [itt](https://github.com/orgs/bb-io/repositories) találja.

A módosítások telepítésekor egy egyéni alkalmazásban kell ezt megtennie. Kérjük, tekintse meg a [telepítési útmutatót](/blackbird-docs/sdk/deploying). Vegye figyelembe, hogy a metaadat struktúrában a `Product` és az `AssemblyName` változókat is módosítania kell. Lásd alább.

## Metaadat struktúra

A Blackbird a `.csproj` fájlban meghatározott tulajdonságokat használja a metaadat mezők kitöltéséhez. A legtöbb egyéni alkalmazás esetében csak a Version és az AssemblyName releváns (a többi tulajdonság a felhasználói felületen van meghatározva). Egy meglévő alkalmazás újabb verziójának feltöltésekor győződjön meg arról, hogy a verziószám magasabb.

![nuget](../../../../assets/docs/csproj.png)