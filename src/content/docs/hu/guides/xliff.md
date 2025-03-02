---
locale: hu
title: XLIFF használata
description: Az XLIFF a fordítási automatizálás sarokköve, ebben az útmutatóban bemutatjuk, hogyan használhatod az XLIFF-et a Blackbird.io-ban.
sidebar:
  label: XLIFF használata
  order: 4
  hidden: false
---

Az XLIFF (XML Localization Interchange File Format) a nyelvi és lokalizációs ipar szabványosításának világítótornya, amely lehetővé teszi a fordítási adatok zökkenőmentes cseréjét. A tartalmat fordítási egységekbe szervezi, amelyek mindegyike egy forrásszegmensből és a hozzá tartozó célfordításból áll.

![Image of XLIFF](~/assets/guides/xliff/ImageOfXliff.png)

Míg a legtöbb Fordításkezelő Rendszer (TMS) és Számítógéppel Támogatott Fordítási (CAT) eszköz könnyedén kezeli az XLIFF fájlokat, más eszközök esetleg nem annyira fájlbarátok. Azonban a Blackbird.io világában, ahol az interoperabilitás uralkodik, új szárnyakat - vagyis műveleteket - bontottunk ki, hogy az XLIFF-ek még a nem fájlbarát alkalmazásokban is szárnyalhassanak.

### Mi újult meg?

Legújabb kiadásunkban olyan új műveleteket vezettünk be, amelyek lehetővé teszik, hogy az XLIFF fájlok kecsesen táncoljanak át olyan alkalmazásokon, mint az OpenAI, DeepL, ModernMT, Anthropic, TAUS és ModelFront, amelyek jellemzően a szöveget részesítik előnyben a fájlokkal szemben.

### Miért válaszd az XLIFF-et?

Miért ne? Ez a lokalizáció univerzális nyelve! Ráadásul az újonnan integrált alkalmazásainkkal, az Okapi és Matecat szűrőkkel a különböző fájlformátumok és az XLIFF közötti konverzió még soha nem volt ilyen egyszerű. Ez azt jelenti, hogy alkalmazásaid csapata most harmonikus repülésben egyesítheti erőit, kitágítva a Blackbird.io-val elérhető lehetőségek horizontját.

## Fájlkonverziós alkalmazások

### Okapi

Az [Okapi](../../apps/okapi/) keretrendszerrel a fájlok XLIFF-re és vissza történő konvertálása gyerekjáték. Két új műveletünk, a "Fájl konvertálása XLIFF-re" és megbízható társa, az "XLIFF konvertálása fájlra", megnyitja az utat a zökkenőmentes fájlformátum-átalakításokhoz. Ellenőrizd az ezekhez a műveletekhez támogatott fájltípusokat [itt](https://www.okapiframework.org/wiki/index.php?title=Filters), és engedd, hogy fájljaid kitárják szárnyaikat.

### Matecat filters

Egy másik hatékony alkalmazás az XLIFF-re való konvertáláshoz és vissza a [Matecat filters](../../apps/matecatfilters/), mivel lehetővé teszi bármely támogatott fájlformátumból az összes fordítható tartalom kinyerését egy kényelmes XLIFF fájlba. Amint az XLIFF lefordításra kerül, újra használhatod a szűrőket, hogy visszakapd a fájlodat a célnyelven, tökéletesen megőrzött formázással.

## LLM-ek

### OpenAI

Bemutatjuk fejlett műveleteinket az XLIFF fájlok feldolgozásához! A Blackbird.io három kényelmes műveletet kínál az AI erejének kihasználására fordítási munkafolyamatod javításához:

- XLIFF fájl feldolgozása: Ez a művelet egy XLIFF fájlt vesz bemenetként, gondosan elemezve az összes forrásszegmenst. Konkrét utasításokat adhatsz meg a `Prompt` bemenetben, vagy alapértelmezetten hagyhatod, hogy az [OpenAI](../../apps/openai/) fordítsa le. Az eredmények zökkenőmentesen kerülnek be a célszegmensekbe, biztosítva egy teljesen lokalizált XLIFF fájlt kimenetként. A szószedettámogatás elérhető a terminológiai következetesség fenntartásához.
- XLIFF utószerkesztése: Ez a művelet tovább megy azzal, hogy mind a forrás-, mind a célszegmenseket feldolgozza. Finomítja a meglévő fordításokat, elvégezve a szükséges szerkesztéseket az általános minőség javítása érdekében. A szószedetek beépítésének lehetőségével biztosítja, hogy fordításaid nemcsak pontosak, hanem következetesek is legyenek az előnyben részesített terminológiáddal.
- Minőségi pontszámok lekérése XLIFF fájlhoz: Ez a művelet értékeli a fordításaid minőségét, pontszámot rendelve minden fordítási egységhez és egy átfogó pontszámot a fájl szintjén. További részleteket erről a műveletről [itt](../../apps/openai/#xliff-operations) találsz.

### Anthropic

Hasonló műveletek kerültek hozzáadásra az [Anthropic](../../apps/anthropic/#xliff-actions) alkalmazáshoz, hogy kísérletezhess a választott modelleddel.
Műveletek:

- XLIFF feldolgozása
- XLIFF fájl utószerkesztése
- Minőségi pontszámok lekérése XLIFF fájlhoz

## Gépi fordítás

### DeepL

Bár a [DeepL](../../apps/deepl/) több [fájltípust](https://developers.deepl.com/docs/api-reference/document) támogat, XLIFF fájlok esetében csak a 2.1-es verzió fogadható el bemenetként. Most több háttérvarázslat adtunk hozzá, hogy áthidaljuk ezt a szakadékot, így lehetőséged van 1.2-es XLIFF fájljaidat a DeepL-en keresztül lefordíttatni, valamint bármely más fájlt, amelyet korábban XLIFF 1.2-re konvertáltál az Okapi vagy Matecat filters műveleteinkkel.

### ModernMT

[ModernMT](../../apps/modernmt/) alkalmazásunkat is úgy alakítottuk, hogy az XLIFF fájlokat fel lehessen dolgozni akár teljes fájlok fordításához, akár minőségbecsléshez. Az Okapiból vagy Matecat filtersből érkező fájlok problémamentesen feldolgozhatók.

## Minőségbecslő alkalmazások ([TAUS](../../apps/taus/), ModernMT, OpenAI, Anthropic és [ModelFront](../../apps/modelfront/))

Legújabb Blackbird műveleteink madártávlatból teszik lehetővé az XLIFF minőségének megtekintését. Az XLIFF-en belüli minden szegmens minőségi pontszámának kiszámításával és egy olyan aggregált szám visszaadásával, amely képet ad a fájl általános minőségéről. Ez korábban csak egyedi szegmensekre volt fenntartva. Ezen kívül minden fordítási egység kiegészül az egyéni pontszámával, amely az XLIFF fájl extradata attribútumához adódik hozzá.

![Average Scores as output](~/assets/guides/xliff/AverageScore.png)

![Image of extradata and scores](~/assets/guides/xliff/Imageofextradataandscores.png)

Opcionálisan a Küszöbérték, Új cél állapot és Feltétel bemeneti paraméterek beállíthatók a Blackbird művelethez, hogy megváltoztassák a kívánt kritériumoknak megfelelő szegmensek cél állapot értékét. Ez azt jelenti, hogy jelezheted a megfelelően lefordított szegmenseket, és blokkolhatod őket, amikor az XLIFF fájlt egy TMS-be importálod emberi ellenőrzésre, időt és pénzt takarítva meg, és az erőfeszítéseket azokra a szegmensekre összpontosítva, amelyek valóban szerkesztést igényelnek.

Példa

Az opcionális bemeneti értékek alábbi képen látható beállítása azt eredményezi, hogy minden 0,9 feletti pontszámú szegmens cél állapot értéke "final"-ra frissül. Amikor ezeket az XLIFF fájlokat TMS eszközökbe importálod, általában hozzáadható egy beállítás, amely lezárja a meghatározott cél értékkel rendelkező szegmenseket (ebben az esetben "final"), így a fordítók csak az alacsonyabb minőségű szegmensekre koncentrálhatnak és szerkeszthetik azokat.

![Optional Input](~/assets/guides/xliff/optionalinput.png)

![Updated Target State](~/assets/guides/xliff/UpdatedTargetState.png)

## Íme, egy fenséges madár akcióban!

Bár az új műveletek önmagukban is nagy értéket adnak és új lehetőségeket teremtenek, amikor láncolatban vannak, még hatékonyabbá válnak. Alább egy példa látható egy madárra, amely egy .docx fájlt vesz bemenetként, a fájl XLIFF-ré konvertálódik az interoperabilitás érdekében, majd az OpenAI-t használja a fájl lefordításához a célnyelvre. Ezután a TAUS-t használja a fordítások minőségének meghatározására, és egy döntési operátor határozza meg a fájl következő lépéseit: ha az átlagos minőségi pontszám a meghatározott 0,95-ös küszöbérték felett van, az XLIFF lefordított .docx-szé konvertálódik és véglegesként kerül kézbesítésre. Egyébként, ha az átlagos pontszám 0,95 alatt van, a fájl importálásra kerül egy TMS-be további emberi szerkesztésre. Ez biztosítja, hogy csak azok a fájlok kerülnek feltöltésre a TMS-be, amelyek valóban emberi beavatkozást igényelnek, míg a minőségi fordítások azonnal visszakerülnek.

![screenshot of bird](~/assets/guides/xliff/XliffSampleBird.png)