---
title: SSO
description: Egyszerűsítse a hitelesítést az egyszeri bejelentkezés (SSO) integrációval
sidebar:
  label: SSO
  order: 8
  hidden: false
---

A Google és a Microsoft által kínált egyszeri bejelentkezési (SSO) megoldások zökkenőmentes és biztonságos módot nyújtanak a több alkalmazáson átívelő hitelesítés kezelésére. Az egyszeri bejelentkezés lehetővé teszi a felhasználók számára, hogy egyetlen hitelesítő adatkészlettel férjenek hozzá különböző platformokhoz, ezáltal egyszerűsíti a bejelentkezési folyamatot, csökkenti a biztonsági incidensek kockázatát és minimalizálja a jelszóval kapcsolatos fáradtságot. Ez nemcsak a biztonságot javítja, hanem a felhasználói élményt is, növelve a termelékenységet és a hatékonyságot a szervezetben.

#### Egyszerűsített bejelentkezés a Blackbird rugalmas hitelesítési lehetőségeivel
A Blackbird-nél rugalmas bejelentkezési lehetőségeket kínálunk az igényeinek megfelelően. Bejelentkezhet egyedi azonosítóval és jelszóval, vagy kihasználhatja az SSO által nyújtott kényelmet. A felhasználói élmény további egyszerűsítése érdekében a Blackbird automatikus fiókösszekapcsolási funkcióval rendelkezik. Ha az SSO-szolgáltatónál (például Google vagy Microsoft) használt e-mail címe megegyezik a Blackbird-fiókjához tartozó e-mail címmel, akkor további beállítások nélkül egyszerűen bejelentkezhet az SSO használatával. Ez zökkenőmentes és problémamentes bejelentkezési élményt biztosít, lehetővé téve, hogy a legfontosabb dolgokra összpontosítson.

**SSO használata a bejelentkezéshez:**

A bejelentkezési képernyőn válassza a Google vagy Microsoft gombot az e-mail címének megadása után.

![Initial](~/assets/guides/sso/buttons.png)

Ez megnyitja a kiválasztott szolgáltatást, és felkéri a bejelentkezésre, ha még nem tette meg.

Ha a többfaktoros hitelesítés (MFA) engedélyezve van, a másodlagos hitelesítési lépést is el kell végeznie.

Miután bejelentkezett, a Blackbird ellenőrzi, hogy a Microsoft vagy Google e-mail címe megegyezik-e a Blackbird-fiókjához tartozó e-mail címmel. Ha egyeznek, hozzáférést kap a Blackbird példányához.

> **💡 Megjegyzés**: az első bejelentkezéskor előfordulhat, hogy az SSO-szolgáltató megkéri, hogy erősítse meg, hogy adatokat kíván megosztani a Blackbird-del.

Ha olyan szervezeti szintű szabályzatot szeretne beállítani, hogy csak a szervezetéhez tartozó felhasználók jelentkezhessenek be a Blackbird példányába, akkor egy szervezeti adminisztrátornak kell bejelentkeznie. Számukra egy további képernyő jelenik meg ezeknek a beállításoknak a konfigurálásához.