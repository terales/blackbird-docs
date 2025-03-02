---
title: Blackbird App
description: Egy Egg, amely lehetőséget nyújt figyelő Madaraknak a létrehozására, hogy nyomon követhess mindent, ami a Blackbird példányodban történik
sidebar:
  label: Blackbird app
  order: 5
  hidden: false
---

## Egg-ek: Kiindulópontok a Madaraidhoz

A Blackbird-ben az Egg-ek a munkafolyamataid magjai vagy tervrajzai. Ezek képviselik a kezdeti ötleteket, amelyek potenciálisan teljes értékű Madarakká válhatnak.

Ebben az Egg-útmutatóban nézzünk meg néhány lehetőséget a Blackbird példányodban történő események figyelésére és a róluk kapott értesítésekre központosított módon. Minden használati eset után találsz **Letölthető Egg-eket**.

## Maradj naprakész a Blackbird alkalmazással

Sok Fészekkel, Madárral, felhasználóval és Repüléssel könnyű elveszíteni a raj áttekintését. A Blackbird-et úgy tervezték, hogy csendesen működjön a háttérben, automatizálva a munkafolyamataidat anélkül, hogy folyamatos ellenőrzésre lenne szükség. De mi történik, ha egy Madár felfüggesztésre kerül, egy felhasználó csatlakozik vagy elhagyja a Fészket, vagy egy Repülés lezuhan? Itt jön képbe a Blackbird alkalmazás! Gondolj rá, mint megbízható őrtoronyra, amely szemmel tartja a Blackbird példányodban zajló összes tevékenységet. Akár táblázatban naplózza a frissítéseket, akár értesítéseket küld közvetlenül a Slackre, Teamsre vagy Outlookra, a Blackbird alkalmazás biztosítja, hogy soha ne maradj le semmiről – még egyetlen csiripelésről sem.

## Használati esetek

### Hibaértesítés vagy nyomon követés

A Blackbird alkalmazás legnépszerűbb felhasználási esete a Blackbird-ben a sikertelen Repülések figyelése. Valós idejű értesítéseket kaphatsz, amelyek fontos részleteket tartalmaznak, mint például a hibaüzenet, a Fészek neve, a Madár neve, a Repülési azonosító és a kezdési dátum. Vagy naplózhatod ezeket a sikertelen Repüléseket egy táblázatban későbbi áttekintésre vagy irányítópultok adatokkal való feltöltésére.

> Használd az opcionális bemeneteket egy adott Fészek figyeléséhez, különben egyetlen Madár fogja figyelni a Blackbird példányodban lévő összes Fészket.

![Egg](~/assets/docs/eggs/BBApp1.png)
Hiba eszkalációs Madár

- Egg letöltése: <a href="https://docs.blackbird.io/downloads/Report_failed_Flights_on_Slack.json" download>Sikertelen Repülések jelentése Slacken</a>
- Egg letöltése: <a href="https://docs.blackbird.io/downloads/Report_failed_Flights_on_Teams.json" download>Sikertelen Repülések jelentése Teamsen</a>
- Egg letöltése: <a href="https://docs.blackbird.io/downloads/Report_failed_Flights_via_Outlook_email.json" download>Sikertelen Repülések jelentése Outlook e-mailben</a>
- Egg letöltése: <a href="https://docs.blackbird.io/downloads/Report_failed_Flights_via_Gmail.json" download>Sikertelen Repülések jelentése Gmailben</a>

![Egg](~/assets/docs/eggs/BBApp2.png)
Hiba naplózó Madár

- Egg letöltése: <a href="https://docs.blackbird.io/downloads/Log_failed_Flights_on_Google_Sheets.json" download>Sikertelen Repülések naplózása Google Sheetsben</a>
- Egg letöltése: <a href="https://docs.blackbird.io/downloads/Log_failed_Flights_on_Microsoft_Excel.json" download>Sikertelen Repülések naplózása Microsoft Excelben</a>

### Hozzáadott vagy eltávolított felhasználók

Figyeld az adott Fészekhez hozzáadott vagy onnan eltávolított felhasználókat.

![Egg](~/assets/docs/eggs/BBApp3.png)

- Egg letöltése: <a href="https://docs.blackbird.io/downloads/On_user_removed_send_Slack_message.json" download>Felhasználó eltávolításakor Slack üzenet küldése</a>

### Felfüggesztett vagy aktivált Madarak

Értesülj a Madarak felfüggesztéséről vagy aktiválásáról: kapj valós idejű értesítéseket a Termelési Fészkedben történő változásokról.

![Egg](~/assets/docs/eggs/BBApp4.png)

> Használd az opcionális bemeneteket egy adott Fészek figyeléséhez, különben egyetlen Madár fogja figyelni a Blackbird példányodban lévő összes Fészket.

- Egg letöltése: <a href="https://docs.blackbird.io/downloads/On_Bird_activated_send_Slack_message.json" download>Madár aktiválásakor Slack üzenet küldése</a>

## Egg-ek importálása

Egg importálása a Fészkedbe:

1. Navigálj a Madár Szerkesztő részhez.
2. Kattints az Import gombra a jobb felső sarokban.
3. Válaszd ki az importálni kívánt Egg (JSON) fájlt, és kattints az `Import` gombra.
4. Keresd meg az újonnan létrehozott Madarat és kattints rá a szerkesztéshez.
5. Add hozzá a kapcsolat részleteit és bármilyen más szükséges bemeneti paramétert vagy kívánt lépést. Figyelj a lépések neve mellett megjelenő piros figyelmeztető jelekre, amelyek hiányzó részletekre utalnak az adott lépésben.
6. Kattints a Madár neve melletti három pontra, és frissítsd az alkalmazásokat, ha vannak elérhető frissítések.
7. Kattints a Mentés/Közzététel gombra.

![Egg-ek importálása](~/assets/docs/eggs/ImportEggs.gif)