---
locale: hu
title: TMS to LLM and Back
description: Egy olyan Egg, amely lehetőséget kínál egy TMS-ből LLM-be és vissza irányuló Bird létrehozására
sidebar:
  label: TMS to LLM
  order: 2
  hidden: false
---

### Eggs: Kiindulópontok a Birdekhez

A Blackbirdben az Egg-ek a munkafolyamatok magjai vagy tervrajzai. Olyan kezdeti ötleteket képviselnek, amelyek teljes értékű Birdekké fejlődhetnek.

Ebben az Egg-útmutatóban nézzünk meg néhány lehetőséget egy TMS és egy LLM integrálására. [A **Letölthető Egg-eket** a végén találja!](../../eggs/tms-to-llm/#download-an-egg)

## Folyamat vázlata

1. **Kiváltó ok: állapot a TMS-ben**
A fájlok, feladatok vagy projektek elérnek egy bizonyos állapotot a TMS munkafolyamatban
2. **Fájl letöltés**
A fájlokat letöltjük a TMS-ből.
3. **LLM**
A letöltött fájlokat feldolgozásra küldjük egy LLM-nek.
4. **Feldolgozott fájlok feltöltése**
A feldolgozott fájlokat visszatöltjük a TMS-be.

Egg a Phrase és az Anthropic között
![Egg](~/assets/docs/eggs/Egg2-Phrase-to-Anthropic.png)

## Tippek

- **Prompt:** Az opcionális bemenetek között hozzáadhatja saját utasításait az LLM számára.
- **Bucket méret:** Az XLIFF fájlok sok szegmenst tartalmazhatnak. Minden művelet veszi a szegmenseket és elküldi azokat az LLM-nek feldolgozásra. Előfordulhat, hogy a szegmensek mennyisége olyan nagy, hogy a prompt meghaladja a modell kontextusablakát, vagy a modell több időt vesz igénybe, mint amennyi a Blackbird műveleteknek megengedett. Ezért vezettük be a bucket méret paramétert. A bucket méret paraméter beállításával meghatározhatja, hány szegmenst küldjön egyszerre az LLM-nek. Ez lehetővé teszi a munkaterhelés felosztását különböző hívásokra. Ennek hátránya, hogy ugyanazt a kontextus promptot minden kéréssel együtt el kell küldeni (ami növeli a felhasznált tokenek számát). Kísérleteink alapján azt találtuk, hogy az 1500-as bucket méret elegendő olyan modellek esetében, mint a gpt-4o. Ezért 1500 az alapértelmezett bucket méret, azonban más modellek esetében eltérő bucket méretek lehetnek szükségesek.
- **Polling Events:** Néhány alkalmazás [polling](../../concepts/triggers/#polling) módszert használ webhookok helyett a frissített/új fájlok észlelésére. Ellenőrizze az _Interval_ fület a trigger beállításakor, és válassza az Önnek megfelelő időtartamot (5 perc és 7 nap között).
- **Szószedet integráció:** Szószedetek adhatók hozzá a fordítás pontosságának és következetességének javítása érdekében. Ezek exportálhatók számos alkalmazásból, és a Blackbird biztosítja a kompatibilitást (az alkalmazások között szerepelnek TMS és CAT eszközök, sőt [Microsoft Excel táblázatok](../../apps/microsoft-excel/#exporting-glossaries) is).
- **Célnyelv:** Kiválaszthat egy nyelvet a használt LLM alkalmazás bemenetei közül. Ha nincs megadva, a nyelveket az XLIFF fájlok fejlécéből nyeri ki a rendszer.
- **Opcionális paraméterek:** Sok LLM alkalmazás különböző beállítható paramétereket kínál, például formalitást, hőmérsékletet, modelleket és bucket méretet. Ellenőrizze a bemenet fület minden lépésnél.
- **Ciklusok szükségesek:** Akár a célnyelvek listáján kell végigmenni, akár minden egyes fájlt a letöltött fájlcsoportból olyan művelethez kell küldeni, amely egyszerre csak egyet fogad, a [ciklusok](../../guides/loops/) jelentik a megoldást.

Egg a MemoQ és az Anthropic között
![Egg simple](~/assets/docs/eggs/Egg2-memoQ-to-Anthropic.png)

Egg a MemoQ és az OpenAI között szószedetekkel.
![Egg with Glossary](~/assets/docs/eggs/Egg2-memoQ-to-OpenAI-with-glossary.png)

## Javasolt alkalmazások

### LLM-ek

- [OpenAI](../../apps/openai/)
- [Anthropic](../../apps/anthropic/)
- [Google Vertex AI](../../apps/google-vertex-ai/)

## Egg letöltése

Töltse le a JSON munkafolyamatokat, hogy importálhassa a Nest-be, végezze el a kívánt módosításokat, és **repüljön**.

- <a href="https://docs.blackbird.io/downloads/MemoQ_to_OpenAI.json" download>MemoQ to OpenAI</a>
- <a href="https://docs.blackbird.io/downloads/MemoQ_to_OpenAI_with_Glossary.json" download>MemoQ to OpenAI with glossaries</a>
- <a href="https://docs.blackbird.io/downloads/MemoQ_to_Anthropic.json" download>MemoQ to Anthropic</a>
- <a href="https://docs.blackbird.io/downloads/Phrase_to_Anthropic.json" download>Phrase to Anthropic</a>

### Egg-ek importálása

Egg importálása a Nest-be:

1. Navigáljon a Bird Editor részhez.
2. Kattintson az Import gombra a jobb felső sarokban.
3. Válassza ki az importálni kívánt Egg (JSON) fájlt, és kattintson az `Import` gombra.
4. Keresse meg az újonnan létrehozott Birdet, és kattintson rá a szerkesztéshez.
5. Adja hozzá a kapcsolat részleteit és bármilyen más szükséges bemenet/kimenet paramétert vagy kívánt lépést. Keresse a piros figyelmeztető jeleket a lépés neve mellett, amelyek hiányzó részleteket jeleznek az adott lépésben.
6. Kattintson a Bird neve melletti három pontra, és frissítse az alkalmazásokat, ha vannak elérhető frissítések.
7. Kattintson a Mentés/Közzététel gombra.

![Importing Eggs](~/assets/docs/eggs/ImportEggs.gif)