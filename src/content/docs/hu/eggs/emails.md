---
title: Gyakori e-mail-rendelés/projekt használati esetek
description: Vizsgáljuk meg alaposabban az e-mailekkel kapcsolatos gyakori használati eseteket
sidebar:
  label: E-mail
  order: 6
  hidden: true
---

### Eggs: Kezdőpontok a madaraidhoz

A Blackbird-ben az Eggs (tojások) a munkafolyamataid magjai vagy tervrajzai. Ezek olyan kezdeti ötleteket képviselnek, amelyek teljes értékű Birds-ekké (madarakká) válhatnak.

Ebben az Egg-útmutatóban felfedezzük az e-mailekkel kapcsolatos gyakori használati eseteket [Microsoft Outlook](https://docs.blackbird.io/apps/microsoft-365-email-outlook/) vagy [Gmail](https://docs.blackbird.io/apps/gmail/) segítségével. A **Letölthető Eggs** a végén találhatók - tölts le JSON munkafolyamatokat, hogy [importáld a Nest-edbe](https://docs.blackbird.io/eggs/emails/#importing-eggs), add hozzá a kapcsolataidat, végezd el a kívánt módosításokat, és **repülj**.

## Folyamat áttekintése

1. **Indítóesemény: Csatolmányokkal rendelkező e-mail érkezése**
Amint egy fájlokat tartalmazó e-mail érkezik, a Bird elindul.
2. **Információkinyerés**
Akár reguláris kifejezések, akár egy LLM segítségével, a releváns adatok összegyűjtésre kerülnek. A csatolt fájlok letöltődnek.
3. **Rendelés/projekt létrehozása**
Az e-mail szövegéből kinyert információkat egy új rendelés vagy projekt kitöltésére használjuk. A fájlok feltöltődnek.
4. **E-mail válasz**
Az új rendelés/projekt részleteit válaszként elküldjük. Gépi fordítású fájlok is küldhetők azonnali válaszként.

## Tippek

- **Szűrők:** Döntési lépések vagy szűrők adhatók hozzá annak biztosítására, hogy csak a megfelelő e-maileket kezeljük. Pl. ellenőrizzük, hogy a tárgy tartalmaz-e bizonyos előre meghatározott kulcsszavakat. Ha a [Gmail](https://docs.blackbird.io/apps/gmail/) alkalmazást használod, egy szűrő adható hozzá az `On emails received` indítóeseményhez keresési lekérdezés formájában.
- **Információkinyerés:** megállapodható egy űrlapszerkezet, amelyből reguláris kifejezésekkel nyerhetünk ki információkat. Ez hibalehetőségeket rejthet az emberi beviteltől való függés miatt. LLM is használható a fontos részletek kinyerésére az e-mail szövegéből a kívánt formátumban.
- **Nyelvi konverzió:** Az alkalmazások különböző nyelvkód szabványokat használnak. A [Libraries](https://docs.blackbird.io/concepts/libraries/) segíthetnek ezeket a különbségeket megoldani.
- **Gépi fordítás:** MT alkalmazások használhatók a lefordított fájlok szinte azonnali visszaküldésére.
- **Minőségbecslés:** Döntési lépés adható hozzá annak meghatározására, hogy az MT fordításokat végső verzióként küldjük-e vissza, vagy emberi ellenőrzésre irányítsuk.
- **Lekérdezési események:** Egyes alkalmazások [lekérdezést](https://docs.blackbird.io/concepts/triggers/#polling) használnak webhookok helyett az új e-mailek észlelésére. Ellenőrizd az _Interval_ lapot az indítóesemény beállításakor, és válaszd a számodra megfelelő időt (5 perc és 7 nap között).

Egg, amely e-maileket kap az Outlookból a DeepL-be és a Tradosba.
![Egg e-mailekkel](../../../../assets/docs/eggs/Egg6_Outlook_DeepL_Trados.png)

Közelebbi pillantás az e-mail válaszra.
![E-mail válasz](../../../../assets/docs/eggs/Egg6_InstantReply.png)

Példa promtra a nyelvkódok kinyeréséhez
![LLM prompt](../../../../assets/docs/eggs/Egg6_GetLanguageExample.png)

Nyelvkódok kinyerése reguláris kifejezések segítségével.
![Regex](../../../../assets/docs/eggs/Egg6_ExtractLanguagesRegex.png)

## Egg letöltése

Tölts le JSON munkafolyamatokat a Nest-edbe való importáláshoz, végezd el a kívánt módosításokat, és **repülj**.

- <a href="https://docs.blackbird.io/downloads/Outlook_MT_memoQ.json" download>Outlook e-mailek DeepL-ből memoQ-ba</a>
- <a href="https://docs.blackbird.io//downloads/Outlook_MT_Trados.json" download>Outlook e-mailek DeepL-ből Tradosba</a>
- <a href="https://docs.blackbird.io//downloads/Gmail_to_quote.json" download>Gmail árajánlathoz</a>

## Eggs importálása

Egy Egg importálása a Nest-be:

1. Navigálj a Bird Editor szekcióba.
2. Kattints az Import gombra a jobb felső sarokban.
3. Válaszd ki az importálni kívánt Egg (JSON) fájlt, és kattints az `Import` gombra.
4. Keresd meg az újonnan létrehozott Bird-et, és kattints rá a szerkesztéshez.
5. Frissítsd a kapcsolat részleteit és bármilyen más szükséges bemeneti/kimeneti paramétert vagy kívánt lépést. Figyelj a piros figyelmeztető jelekre a lépés neve mellett, amelyek hiányzó részletekre utalnak az adott lépésben.
6. Kattints a Mentés/Közzététel gombra.

![Eggs importálása](../../../../assets/docs/eggs/ImportEggs.gif)