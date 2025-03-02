---
title: Beszéljünk a Fészkekről és a Hozzáférés-szabályozásról
description: Ebben az útmutatóban megtanulhatja, hogyan szervezheti el Blackbird folyamatait, hitelesítő adatait és felhasználóit.
sidebar:
  label: Fészkek és Hozzáférés-szabályozás
  order: 3
  hidden: false
---

Ebben az útmutatóban megtanulhatja, hogyan szervezheti el Blackbird folyamatait, hitelesítő adatait és felhasználóit.

> Adminisztrátorként, aki hozzáféréssel rendelkezik a Blackbird fiókjához, lehetősége van több Fészek, felhasználó és szerepkör létrehozására a szervezet igényeinek megfelelően. Navigáljon a Szervezeti menedzsmenthez, hogy elérje ezeket a lehetőségeket.

## Fészkek

Az adatok elkülönítése nemcsak a biztonsági intézkedéseket erősíti, hanem növeli a termelékenységet is, mivel az adatok egyértelmű elhatárolása megszünteti a felesleges zsúfoltságot. Érdemes külön Fészket létrehozni minden egyes ügyfelének vagy a munkafolyamat-tervezési folyamat egyes szakaszainak (teszt, minőségellenőrzés, éles környezet) - vagy akár mindkettőnek, mivel a Fészkek további alfészkeket is tartalmazhatnak a jobb szervezés érdekében. A jobb felső sarokban kattintson a profilképére, és válassza a Szervezeti menedzsmentet. A bal oldalon az első opció a Fészkek, itt láthatja a szervezete alá tartozó meglévő Fészkek listáját, nevükkel, felhasználók számával és létrehozási dátumukkal együtt. Ha egy adott Fészekre kattint, további részleteket láthat, például az összes hozzáadott felhasználót, és lehetősége van az adott Fészek törlésére is.

![Fészkek felhasználói részletei](~/assets/guides/nests/1.png)

A tetején található a 'Fészek létrehozása' gomb, amellyel új szekciót hozhat létre.

![Fészek létrehozása gomb](~/assets/guides/nests/2.png)

Ha egy meglévő Fészek alá alfészket szeretne hozzáadni, egyszerűen kattintson a Fészek sorának végén található plusz jelre.

![Alfészek létrehozása](~/assets/guides/nests/31.png)

![Alfészek létrehozása](~/assets/guides/nests/32.png)

Az alfészkek öröklik az alkalmazások hitelesítő adatait a szülő Fészektől. Létrehozhat egy Fészket az 1. Ügyfél számára, hozzáadhatja a szükséges alkalmazások hitelesítő adatait ehhez a Fészekhez, majd létrehozhat alfészkeket a különböző munkafázisokhoz. Az alfészkekhez hozzáféréssel rendelkező felhasználók képesek lesznek csatlakozni ezekhez az alkalmazásokhoz, és beépíthetik azokat munkafolyamataikba, miközben a szülő Fészekhez hozzáadott hitelesítő adatokat használják, azonban nem tudják kezelni (vagy látni a részleteket) ezen hitelesítő adatokról. Ez azt jelenti, hogy az információkat csak egyszer kell megadni, mivel azokat az alfészkek automatikusan öröklik.

## Felhasználók

Meghatározhatja azt is, hogy ki férhet hozzá az egyes példányokhoz, és mit láthatnak vagy tehetnek, így nagyon részletes hozzáférés-szabályozást biztosíthat. A Felhasználók lapon láthatja a szervezetéhez meghívott összes személyt, szerepkörüket és státuszukat. A jobb felső sarokban választhatja a _Felhasználó hozzáadása_ lehetőséget. Meg kell adnia a nevüket, e-mail címüket, és ki kell választania a megfelelő szerepkör(öke)t és Fészke(ke)t, amelyekhez hozzáférhetnek. Miután hozzáadott egy felhasználót, e-mail meghívót kapnak, amely arra kéri őket, hogy generáljanak jelszót a Blackbird eléréséhez.

![Felhasználó hozzáadása](~/assets/guides/nests/4.png)

## Szerepkörök

Alapértelmezés szerint a Felhasználó és Admin szerepköröket látja elérhető lehetőségként. Azonban ez személyre szabható, hogy megfeleljen a konkrét felelősségeknek és hozzáférési követelményeknek. A szerepköröket szerkesztheti (a frissíteni kívánt szerepkörre kattintva), törölheti vagy nulláról létrehozhatja. Új szerepkör létrehozásához egyszerűen kattintson a _Szerepkör hozzáadása_ gombra, adjon nevet ennek a szerepkörnek, és válassza ki, mely jogosultságokat szeretné megadni.

![Elérhető jogosultságok](~/assets/guides/nests/5.png)

Például, meghívhatja egyik ügyfelét a Blackbird példányába, és adhat neki egy "Ügyfél" szerepkört, amely csak arra jogosítja fel, hogy hitelesítő adatokat adjon hozzá egy alkalmazáshoz való csatlakozáshoz. Ezzel elkerüli az adatok manipulálását vagy megosztását. Lehetnek olyan ügyfelei, akiknek _erősebb_ szerepkörre van szükségük, mert szeretnék áttekinteni a folyamatokat; ehhez szélesebb körű, de csak olvasási jogosultságot adhat. Vagy lehet, hogy együttműködőbb megközelítést szeretne, és lehetővé tenné számukra, hogy Önnel együtt építsék a munkafolyamatokat. Mindez lehetséges, és mint minden más a Blackbird-nél, Ön határozza meg.

## Arculat

Végül, a _Arculat_ fül alatt található egy white-label opció, amely lehetővé teszi saját logójának feltöltését (a Blackbird logó helyettesítésére a bal felső sarokban), és lehetővé teszi a példánya megjelenésének testreszabását.

![Arculat](~/assets/guides/nests/6.png)