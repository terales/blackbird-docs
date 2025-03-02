---
locale: hu
title: Libraries
description: Ismerje meg, hogyan térképezze fel az előre meghatározott adatokat és hogyan használja azokat a Járatai során
sidebar:
  label: Libraries
  order: 5
  hidden: false
---

## Mi az a Library?

A munkafolyamatok és adatkezelés kontextusában a "Library" (Könyvtár) egy strukturált mátrix vagy táblázat, amelyet különböző információk leképezésére és kezelésére használnak. Referenciaként szolgál, amely lehetővé teszi, hogy egyszerűen átkonvertáljon egy információt egy másikba előre meghatározott leképezések alapján. A könyvtárak különösen hasznosak az előre meghatározott adatok rendszerezésére és elérésére, amelyek elengedhetetlenek a munkafolyamatához.

A táblázatokhoz hasonlóan a könyvtárak sorokat és oszlopokat tartalmaznak, ahol minden sor egy egyedi bejegyzést, minden oszlop pedig egy attribútumot vagy az adott bejegyzéshez kapcsolódó információt képvisel.

A könyvtárakat a következőkre használják:
- **Adatok rendszerezése**: Előre meghatározott információk tárolása strukturált formátumban.
- **Munkafolyamatok egyszerűsítése**: Gyors keresés és adatkonverzió lehetővé tétele előre meghatározott leképezések alapján.
- **Interoperabilitás biztosítása**: Egyik eszköz kimenetének konvertálása egy másik eszköz bemenetévé menet közben.

## A Languages Library

A Blackbird-ben van egy dedikált fül a Libraries (Könyvtárak) számára (navigációs sáv a jobb felső sarokban). Az alapértelmezett felhasználási eset a nyelvkódokhoz kapcsolódik: bár léteznek szabványok, minden alkalmazás más kódot használ ugyanannak a nyelvnek a jelölésére. Ezért használjuk az alapértelmezett könyvtárat, hogy különböző kódváltozatokat tároljunk, amelyek ugyanarra a nyelvre vonatkoznak az alkalmazások között.

![Library fül és alapértelmezett könyvtár](~/assets/docs/libraries/LibrariesTab.gif)

A munkafolyamatán (Bird) belül hivatkozhat a könyvtárra a Convert operátor használatával. Kattintson a plusz jelre, mintha egy műveletet adna hozzá, de válassza helyette az Operator lehetőséget. Ezután válassza a `Convert` lehetőséget, a használni kívánt könyvtárat, és az adatok azon részeit, amelyeket konvertálni szeretne. Amint a Bird repül (_munkafolyamat fut_), az adatok átalakulnak és megfelelően továbbítódnak.

<!-- ![Convert Operator](~/assets/docs/libraries/Convert.gif) -->

Íme egy példa, ahol az egyik eszköz kimenete a következő bemenetévé válik, és közben a Convert operátor követi a könyvtárban lévő szabályokat, hogy minden zökkenőmentesen működjön az interoperabilitás szempontjából, még akkor is, ha a két eszköz különböző szabványokat használ a nyelvek jelölésére. Ebben az esetben megkapjuk a hiányzó fordításokkal rendelkező nyelvek listáját egy adott Zendesk cikkhez, és ezekre a nyelvekre szeretnénk lefordítani a cikkeket a DeepL segítségével. Azonban tudjuk, hogy a DeepL más kódot használ ugyanazon nyelvek jelölésére. Ezért egyszer beállítjuk ezeket a kódokat a könyvtárunkban, hozzáadjuk a Convert operátort a munkafolyamatunkhoz, és így már van egy teljesen működőképes Bird-ünk, amelyet nem szakít meg az, hogy két alkalmazás _nem beszéli ugyanazt a nyelvet_.

![Példa Bird](~/assets/docs/libraries/SampleBird.png)

Bár az alapértelmezett könyvtár csak olvasható, létrehozhat saját egyéni könyvtárakat.

## Egyéni könyvtárak

Miközben kihasználhatja a Languages könyvtár előnyeit, létrehozhat egy (vagy több) saját könyvtárat olyan információk leképezésére, amelyek értelmesek Önnek és folyamatainak. Például a tartalomtípusok leképezése, az egyes tartalomtípusokhoz használandó projekt sablon és az egyes minőségi pontszám küszöbértékek. Ily módon dinamikusan irányíthatja a tartalmat a megfelelő projekthez és beállításokhoz anélkül, hogy több egymásba ágyazott döntésre lenne szüksége.

| # | Tartalomtípus  | Projekt sablon | Minőségi küszöbérték |
|---|----------------|----------------|----------------------|
| 1 | Marketing      | Template A     | 0.9                  |
| 2 | Technical      | Template B     | 0.85                 |
| 3 | User generated | Template C     | 0.8                  |

![Egyéni](~/assets/docs/libraries/Custom.png)

## Hogyan hozhat létre saját könyvtárat

Új könyvtár hozzáadásához a következőket teheti:

1. Kattintson az `Add Library` gombra. Válasszon nevet és leírást. Nyissa meg a könyvtárat és manuálisan adjon hozzá sorokat és oszlopokat, kitöltve a cellákat a releváns értékekkel.

![Könyvtár hozzáadása](~/assets/docs/libraries/AddLibrary.gif)

2. Klónozzon egy meglévő könyvtárat és szerkessze annak tartalmát.

![Könyvtár klónozása](~/assets/docs/libraries/CloneLibrary.gif)

3. Importáljon egy vagy több .csv fájlt az `Import` gomb használatával. A fájl tartalma lesz a könyvtár tartalma, a felső sort oszlopfejlécként, a bal oldali oszlopot entitásnevekként használva. Alapértelmezés szerint az első fájl neve lesz a könyvtár neve, hacsak nem szerkeszti azt. A név és a leírás később is szerkeszthető.

![Könyvtár importálása](~/assets/docs/libraries/ImportLibrary.gif)

> A könyvtárak átmásolhatók más Nest-ekbe, exportálhatók `.csv` fájlokként, átnevezhetők és törölhetők.