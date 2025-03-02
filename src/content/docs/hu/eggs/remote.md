---
locale: hu
title: Remote.com felhasználási esetek
description: Egy Egg (tojás), amely potenciállal rendelkezik Remote.com-mal kapcsolatos Birds (madarak) létrehozására
sidebar:
  label: Remote.com
  order: 3
  hidden: false
---

### Eggs: Kiindulópontok a Birds-ek létrehozásához

A Blackbirdben az Eggs (tojások) a munkafolyamatok kezdeti tervei vagy alapjai. Ezek azokat a kezdeti ötleteket képviselik, amelyek teljes értékű Birds-ekké válhatnak.

Ebben az Egg-útmutatóban tekintsük át a [Remote.com](../../apps/remote/) különböző alkalmazásokkal való integrálásának lehetőségeit. Minden felhasználási eset alatt találhatók **Letölthető Eggs** - töltsön le JSON munkafolyamatokat, hogy [importálja a Nest-be](../../eggs/remote/#importing-eggs), adja hozzá kapcsolatait, végezze el a kívánt módosításokat, és **repüljön**.

## Felhasználási esetek

### TBMS erőforrás Remote foglalkoztatáshoz

> A TBMS fordítási üzletkezelő rendszerekre utal. Ebbe a kategóriába tartoznak olyan alkalmazások, mint a Plunet, XTRF vagy Bureau Works.

Az alább látható Bird új foglalkoztatást hoz létre a Remote-ban, amint egy új erőforrást Aktívként állítanak be a Plunet-ben.

![PlunettoRemote](~/assets/docs/eggs/PlunetResourceActivatedCreateRemoteEmployment.png)

- Egg letöltése: <a href="https://docs.blackbird.io/downloads/Plunet_resource_activated_to_Remote_Employment.json" download>Plunet erőforrás aktiválásakor Remote foglalkoztatás létrehozása</a>
- Egg letöltése: <a href="https://docs.blackbird.io/downloads/Remote_employment_completed_set_Plunet_resource_Active.json" download>Remote foglalkoztatás befejezésekor Plunet erőforrás aktiválása</a>

### TBMS számlák Remote-ba

Ez a Bird hetente aktiválódik, megkeresi az XTRF-ben az elmúlt héten frissített számlákat, exportálja, majd importálja őket a Remote-ba. Figyelje meg a Convert operátor használatát, amely egy egyéni könyvtárból nyeri ki az adatokat.

![XTRFtoRemote](~/assets/docs/eggs/XtrfInvoiceToRemote.png)

- Egg letöltése: <a href="https://docs.blackbird.io/downloads/XTRF_invoice_to_Remote.json" download>XTRF számla Remote-ba</a>
- Egg letöltése: <a href="https://docs.blackbird.io/downloads/Remote_to_XTRF_invoice_status_update.json" download>Remote-ból XTRF számlaállapot frissítése</a>

### Remote eseményindítóknál értesítések küldése, adatok naplózása, naptáresemények hozzáadása

Az alábbi kép egy olyan Bird-et mutat, amely akkor aktiválódik, amikor egy szabadság iránti kérelmet jóváhagynak a Remote-ban, majd hozzáad egy eseményt a Microsoft 365 naptárához, naplózza a szabadság részleteit egy Excel táblázatban, és Slack értesítést küld.

![RemoteTimeoffApproved](~/assets/docs/eggs/RemoteTimeoffApproved.png)

- Egg letöltése: <a href="https://docs.blackbird.io/downloads/On_timeoff_approved_add_to_Calendar_Excel.json" download>Szabadság jóváhagyásakor naptárhoz és Excelhez hozzáadás</a>
- Egg letöltése: <a href="https://docs.blackbird.io/downloads/Manual_payout_notification.json" download>Havi manuális kifizetési értesítés</a>

## Tippek

- **Adatok összekapcsolása az alkalmazások között:** A fontos adatpontok összekapcsolásához, amelyek ugyanarra vonatkoznak (pl. Vállalkozói azonosító a Remote-ban és Erőforrás azonosító a Plunet-ben), különböző lehetőségek állnak rendelkezésre:
    - [Egyéni könyvtárak](../../concepts/libraries/#custom-libraries) használhatók az adatok összekapcsolásához, és ezeket a Birds-ekben a Convert operátoron keresztül használhatja, ugyanúgy, mint egy VLookup formulát az Excelben.
    - Egyéni mezők. Sok alkalmazás kínál egyéni mezőket, amelyeket igény szerint lehet meghatározni.
    - [Összekapcsolt entitások](../../guides/entity-linking/).
- **Opcionális bemenetek:** Ellenőrizze a különböző bementi lehetőségeket, különösen az eseményindítóknál, mivel ezek lehetőséget adnak a Bird indításának szűrésére. Például, ha egy "állapot frissítéskor" eseményindítót használ, valószínűleg megtalálja azt a lehetőséget, hogy meghatározza, melyik állapot indítsa el a folyamatot.

### Eggs importálása

Egy Egg importálása a Nest-be:

1. Navigáljon a Bird Editor részbe.
2. Kattintson a jobb felső sarokban lévő Import gombra.
3. Válassza ki az importálni kívánt Egg (JSON) fájlt, majd kattintson az `Import` gombra.
4. Azonosítsa az újonnan létrehozott Bird-et, és kattintson rá a szerkesztéshez.
5. Frissítse a kapcsolati adatokat és minden más szükséges bemeneti/kimeneti paramétert vagy kívánt lépést. Figyeljen a lépés neve mellett megjelenő piros figyelmeztető jelekre, amelyek a lépésben hiányzó részletekre utalnak.
6. Kattintson a Mentés/Közzététel gombra.

![Eggs importálása](~/assets/docs/eggs/ImportEggs.gif)