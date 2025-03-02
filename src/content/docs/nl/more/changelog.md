---
  title: Changelog
  description: Een globaal overzicht van alle wijzigingen aan het BlackBird core platform
---
### (04-02-2025) 4.19
Hoofdfuncties: Meer verbeteringen aan de Flight pagina en logica voor het uploaden van aangepaste apps

##### Flight pagina
- Verbeterde visualisatie van grote Flights (Meer dan 16 mb aan gegevens).
- Verschillende kleine problemen op de Flight pagina opgelost.
- Blackbird leidt nu automatisch door naar een Flight wanneer op de knop 'Fly' wordt geklikt in de Bird-editor.
- Er wordt een animatie getoond wanneer een handmatige Flight nog in de wachtrij staat.
- Verschillende standaardisaties in tekst.

#### Aangepaste apps
- Aangepaste apps zijn nu zichtbaar voor alle Nests, ongeacht in welke Nest de gebruiker zich bevond tijdens het uploaden van de app.

### (07-01-2025) 4.18
Hoofdfuncties: Herziening van de Flight pagina

##### Flight pagina
- Een nieuwe status is toegevoegd. `Waiting` geeft aan dat de Bird in de wachtrij staat en binnenkort zal opstijgen.
- Een vliegende Bird-animatie is toegevoegd aan de Flight pagina die door het proces vliegt om aan te geven waar de Flight zich bevindt.
- Live updates zijn toegevoegd aan de Flight pagina. De Flight pagina geeft altijd de huidige status van de Flight weer.
- De sectie met Flight details is bijgewerkt met verschillende visuele verbeteringen.
- Verschillende bugs zijn opgelost die voorheen leidden tot een onnauwkeurige weergave van de werkelijke Flight gegevens.
- Je kunt nu elke iteratie van een loop afzonderlijk inspecteren.
- De knop 'Stop Flight' is toegevoegd; wanneer hierop wordt geklikt, wordt alleen deze Flight gestopt terwijl andere blijven vliegen.
- Er is een Flight lijst toegevoegd als inklapbare zijbalk. Deze bevat alle Flights van dezelfde Bird die je bekijkt voor eenvoudige navigatie tussen verschillende Flights.

##### Flight overzichtspagina
- Live updates zijn toegevoegd aan de Flight overzichtspagina.
- De tabel en filters hebben een visuele update gekregen.
- Een oneindig scrollen mechanisme is toegevoegd aan de Flight overzichtspagina.

### (17-12-2024) 4.17
Hoofdfuncties: SAML, startpagina en vele kleinere UI-updates

##### Bird-editor
- Je kunt nu `Month's end` selecteren in de geplande trigger Maandelijkse instelling.
- 'Inputs' zijn hernoemd naar 'Filters' voor alle events.
- De volgorde van selecteerbare variabelen is omgedraaid. Nu staan de bovenste variabelen in de dropdown dichter bij waar je bent in vergelijking met van boven naar beneden.
- Dynamische invoerwaarden hebben nu ook de optie om een aangepaste waarde in te voeren. Dit is handig als de dropdown om een of andere reden niet laadt.

#### Overig
- Een help-icoon met links naar documentatieartikelen is toegevoegd op veel pagina's van de app in de linker benedenhoek.
- Sommige knoppen, tabbladen en invoervelden hebben een verbeterde hover- en interactiestatus gekregen.
- Enterprise-gebruikers kunnen nu verzoeken om SAML-gebaseerde SSO te laten inrichten.
- Alle gebruikers hebben nu een willekeurig toegewezen Bird als hun avatar.
- Ongeldige verbindingen tonen nu een duidelijkere foutmelding.
- De startpagina heeft een nieuwe look gekregen met artikelen, video's en snelkoppelingen.

##### Bugfixes
- De knop 'toverstaf' voor samengestelde invoer wordt nu op de juiste plaats weergegeven in de Firefox-browser.
- Checkpoint-activering slaagt nu correct als de Bird niet-gepubliceerde wijzigingen heeft.
- Vertraagde checkpoints op hetzelfde niveau met dezelfde duur kunnen nu worden gepubliceerd.

### (22-11-2024) 4.16

Hoofdfuncties: back-end Flight optimalisaties

##### Overig

- Flights worden nu opgeslagen in een andere structuur waardoor we ze sneller kunnen opvragen.

##### Bugfixes

- Outlook checkpoint events kunnen nu correct worden geactiveerd.
- Het after subscription event werkt nu tijdens checkpoint-activering.

### (01-11-2024) 4.15

Hoofdfuncties: Vriendelijkere en informatievere foutmeldingen en SDK-verbeteringen

##### Bird-editor
- Je kunt nu numerieke invoer correct bijwerken naar het getal 0.
- Handmatige Birds worden nu ook gevalideerd op volledigheid en ontbrekende invoer.
- Het minimale interval voor geplande triggers is nu 5 minuten.
- De push-knop is ingeschakeld na het opnieuw publiceren van een handmatige Bird.
- De split-operator gedraagt zich nu zoals het hoort.
- Toetsenbordnavigatie in array-invoer werkt nu.
- Convert- en entity connection-operators kunnen nu ook worden hernoemd.
- Event-activering is nu compatibel met Outlook.
- Als een actie met de optie 'skip action' wordt geplaatst binnen twee loops die outputs ontvangen van een andere actie en genest zijn binnen elkaar... kan de Bird weer worden gepubliceerd :\).
- Tooltips sluiten correct na het zeer snel bewegen van je muis.
- Het verwerpen van wijzigingen verwerpt nu ook wijzigingen in statische dropdowns.

##### Flights
- Vriendelijkere foutmeldingen worden nu weergegeven op de Flight-pagina die aangeven waar in het systeem een fout is opgetreden. Dit helpt de gebruiker identificeren wie verantwoordelijk is.
- Enkele randgevallen bij bucketing zijn opgelost.

##### SDK
- Events kunnen nu ook bestanden uitvoeren.
- De filemanager upload-methode reset nu de streampositie.
- IApplication's name-attribuut is verouderd verklaard.
- De tenant-ID is toegevoegd aan de invocation context.
- Het datahandler-retourtype is nu uitbreidbaar voor extra informatie.
- Connection definitions kunnen nu statische data source handlers hebben.

##### API
- Geschorste Birds kunnen niet meer worden geactiveerd via de API.
- De Flight-duur die uit de API wordt opgehaald, is nu nauwkeuriger.
- De 'IsPublished'-variabele die uit de API wordt opgehaald, is nu altijd correct.
- Een retry-beleid zorgt er niet meer voor dat de Flight failed webhook meerdere keren wordt aangeroepen.

##### Overig
- De import Bird-modal sluit nu correct na het uploaden van een JSON.
- Sommige teksten die fouten weergaven die zwart waren, zijn nu rood en worden correct weergegeven.
- Library-outputs bevatten nu geen extra \ als de bibliotheekwaarde een " bevatte.
- Spamklikken op 'add user' resulteert niet meer in het toevoegen van meerdere gebruikers.

### (14-10-2024) 4.14

Hoofdfuncties: Checkpoints 🎉

##### Bird-editor
- Je kunt nu _checkpoints_ maken in de Bird-editor. Checkpoints in BlackBird-workflows zijn controlestappen die Birds in staat stellen om te pauzeren en te wachten op verschillende events voordat ze hun Flights voortzetten. Je kunt meer lezen over checkpoints [hier](/blackbird-docs/concepts/checkpoints).
- De selectie van triggertype heeft een visuele vernieuwing gekregen.
- De vertragingsfunctie is verplaatst van operators naar een triggertype onder checkpoint.

##### Overig
- De dropdown voor regels en Nests bij het toevoegen van een gebruiker werkt nu ook wanneer je de lijst filterde.
- Birds met Google- en Microsoft-gerelateerde events kunnen nu correct opnieuw worden geactiveerd na opschorting.
- De pollinginformatietekst is nu weer correct uitgelijnd.

### (24-09-2024) 4.13

Hoofdfuncties: Rechtermuisknopopties, kopiëren, plakken en items dupliceren.

##### Bird-editor
- Je kunt nu met de rechtermuisknop op items in de Bird-editor klikken om een contextmenu weer te geven. Je kunt ook met de linkermuisknop op de drie puntjes klikken.
- Vanuit het contextmenu kun je nu items hernoemen, knippen, kopiëren, dupliceren en verwijderen.
- Vanuit het + icoon in de Bird-editor kun je nu gekopieerde items van je klembord plakken.
- Het algemene Bird-optiemenu heeft een ander uiterlijk gekregen.
- BlackBird informeert je nu om het klembord in je browser in te schakelen als je dat nog niet hebt gedaan.

##### Overig
- De convert-operator toont nu duidelijker of deze verkeerd is geconfigureerd.

### (18-09-2024) 4.12

Hoofdfuncties: Webhooks kunnen direct na abonnement triggeren.

#### SDK
- Een nieuwe interface (`IAfterSubscriptionWebhookEventHandler`) met de methode `OnWebhookSubscribedAsync()` is toegevoegd. Deze methode wordt direct na abonnement aangeroepen en kan worden gebruikt om Flights op dit punt te starten.

##### Bugfixes
- Gepolde Flights worden nu correct weergegeven op de Flight-pagina van nieuwe Nests.
- Het inschakelen van skip action zal je in bepaalde gevallen niet meer verhinderen de Bird op te slaan.
- Acties na een flow-operator die niet getriggerd is, worden nu correct uitgevoerd.

##### Overig
- De file handling core is bijgewerkt om beter samen te werken met WorldServer.

### (10-09-2024) 4.11

Hoofdfuncties: Verbeteringen aan flow-operators en nieuwe samengestelde invoerexpressies.

##### Bird-editor
- De "End Flight" operator is overal in je Bird beschikbaar. De "End Flight" operator stopt de Flight wanneer deze bereikt wordt.
- De "End loop" operator zal uit de loop breken wanneer deze bereikt wordt. Deze is beschikbaar in loops.
- "End Flight" en "End loop" hebben ook een optionele conditie-invoer, zodat men niet altijd gedwongen is om ze in een beslissing te plaatsen.
- Een gebruiker kan nu teksten samenstellen in elke tekstuele invoer die geen input handler (dropdown) heeft gedefinieerd, door op de toverstafknop boven de cursor te klikken.
- De modal die opent wanneer op de "+" knop in de Bird-editor wordt geklikt, is herontworpen.
- Een vriendelijke boodschap is toegevoegd aan de compose-operator om mensen eraan te herinneren dat ze de nieuwe tekstinvoerexpressiefunctie kunnen gebruiken.

##### Bugfixes
- De \ wordt niet langer gedupliceerd als \\ in aangepaste invoer.
- Een numerieke lijst in een compose-operator breekt een Bird niet langer.
- Verschillende problemen rond het importeren van .csv-bestanden in aangepaste bibliotheken zijn opgelost.
- Flights worden nu correct verwijderd uit onze workflow-engine bij opzegging, zelfs als Flights tegelijkertijd binnenkwamen.
- Ontbrekende Flights op de Flight-pagina worden nu weergegeven.
- Een randgeval dat het opslaan van Bird-wijzigingen niet toestond, is opgelost.

### (26-08-2024) 4.10 

Hoofdfuncties: Knoppen voor aangepaste verbindingen en automatisering voor het aanmaken van organisaties.

##### SDK
- Toegevoegd de mogelijkheid om de HTML van verbindingsmodals aan te passen door HTML-sjablonen in de SDK te ondersteunen.
- Meerdere gerelateerde dynamische inputs zijn nu beschikbaar in events.
- App-namen en -beschrijvingen worden nu ook bijgewerkt wanneer een nieuwe app-versie wordt gepubliceerd.

##### Bugfixes
- Een onjuiste foutmelding die werd weergegeven wanneer een bestand te groot was, is opgelost.
- Nest user added en Nest user created API-events worden nu correct getriggerd.
- Bij het maken van een nieuwe verbinding wordt nu een laadpictogram weergegeven.
- Opnieuw geprobeerde acties mislukken nu sneller zodra alle nieuwe pogingen zijn voltooid.

##### Overig
- Standaard Nests worden nu gemaakt wanneer een nieuwe organisatie wordt aangemaakt.

### (09-08-2024) 4.9 

Hoofdfuncties: Automatische loopcreatie.

##### Bird-editor
- De lijst met beschikbare waarden toont nu ook waarden die deel uitmaken van een array. Bijv. wanneer je een bestand kunt invoeren, maar een lijst met bestanden wordt uitgevoerd door een vorige actie, kun je deze waarde nog steeds selecteren.
- Bij het selecteren van een waarde die uit een array komt, wordt automatisch een loop rond de actie toegevoegd.

### (07-08-2024) 4.8.1 

Hoofdfuncties: Webhook prestatieverbeteringen.

##### Flights
- Webhooks presteren nu beter gezien de recente toevoeging van actiebeperkingen in onze workflow-engine.

### (05-08-2024) 4.8 

Hoofdfuncties: beperkingen op gelijktijdige acties per organisatie in multi-tenant omgevingen.

##### Flights
- Flights verwerken nu standaard 6 gelijktijdige acties per organisatie. Dit aantal kan worden aangepast voor elke tenant.