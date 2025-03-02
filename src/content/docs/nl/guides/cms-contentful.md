---
locale: nl
title: CMS Workflows - Contentful
description: Leer hoe je krachtige workflows kunt bouwen rondom CMS-apps. In deze gids nemen we een nadere kijk op Contentful.
sidebar:
  label: CMS Workflows - Contentful
  order: 11
  hidden: false
---

CMS'en (Content Management Systemen) fungeren vaak als centrale punten voor het beheren van content die mogelijk lokalisatie of andere soorten verwerking nodig heeft. Als je Blackbird gebruikt, is er een grote kans dat je het wilt integreren met een CMS. Deze gids helpt je te begrijpen hoe je workflows kunt bouwen die draaien om CMS-gebruik.

Hoewel e-commerce platforms of product information management (PIM) systemen niet officieel als CMS'en worden beschouwd, bieden veel van hen vergelijkbare functies. Daarom is de begeleiding in dit document ook van toepassing op deze systemen.

We beginnen met het verkennen van de gemeenschappelijke functies van CMS'en en de uitdagingen die ze presenteren voor lokalisatie. Daarna, met behulp van de Contentful app als voorbeeld, bespreken we verschillende strategieën voor CMS-lokalisatie workflows. Deze strategieën kunnen worden toegepast op elke CMS-app die beschikbaar is op Blackbird.

Laten we beginnen!

De eerste vraag die je jezelf moet stellen bij het benaderen van een CMS-workflow is het volgende:

>_Ondersteunt dit CMS lokalisatie?_

Uit onze ervaring kan het antwoord een van drie opties zijn:

1. Ja ([Contentful](../../apps/contentful), [Zendesk guides](../../apps/zendesk), [Sitecore](../../apps/sitecore), [Hubspot blog posts & pages](../../apps/hubspot-cms), etc.)
2. Ja, maar alleen met de ondersteuning van een populaire plugin ([WordPress](../../apps/wordpress), Drupal, etc.)
3. Nee ([Marketo](../../apps/marketo), [Notion](../../apps/notion), [Hubspot forms & emails](../../apps/hubspot-cms), etc.)

Wanneer je CMS in de tweede of derde categorie valt, zal er wat meer 'oplossingsarchitectuur' moeten plaatsvinden om de best mogelijke workflow met je CMS te bouwen. Je kunt ook zien dat sommige apps slechts gedeeltelijk native lokalisatie ondersteunen (Hubspot), dit geeft extra uitdagingen wanneer het lokaliseren van alle mogelijke content gewenst is.

Deze gids zal zich vanaf nu richten op de eerste (en meest eenvoudige) van de drie opties. Latere gidsen zullen een nadere blik werpen op de andere opties en oplossingen, maar bouwen voort op wat hier is geschreven.

## 1. Concepten

Een content management systeem bevat over het algemeen (voornamelijk tekstuele) content die gegroepeerd is in een **entiteit**. Deze entiteit is systeemafhankelijk. Voorbeelden van entiteiten zijn: een *artikel* in Zendesk, een *entry* in Contentful, een *product* in Shopify of een *blogpost* in WordPress. Maar WordPress heeft ook *pagina's* en Shopify heeft ook blogposts. Dit betekent dat een CMS ook verschillende soorten lokaliseerbare entiteiten kan hebben.

Wat content samen groepeert tot een entiteit wordt over het algemeen gedefinieerd als "dat wat op een enkele pagina wordt weergegeven". We kunnen deze entiteit daarom zien als synoniem met een gebruikersgerichte pagina. Pagina's en entiteiten hebben ook de neiging om een bepaalde hiërarchie te hebben, meestal gedefinieerd als groepen of **categorieën** in een CMS. Dit maakt het ook erg gemakkelijk om te redeneren over entries in verschillende groepen of categorieën. Bijv. "Ik wil alle pagina's in de FAQ-categorie vertaald hebben".

Een entiteit bevat content. Die content is geschreven in een taal. Daarom moet de entiteit een **locale** of taalattribuut hebben (Opmerking: dit is precies wat ontbreekt in CMS'en die niet van nature lokalisatie ondersteunen). Het locale-attribuut is ongelooflijk belangrijk voor ons, aangezien het hoogstwaarschijnlijk zal bepalen van welke entiteit we content halen en naar welke entiteit we vertalingen sturen.

Tot slot kan het CMS ook ondersteunende functies hebben die cruciaal kunnen zijn voor je lokalisatie workflow, zoals **tags** of **aangepaste velden**.

Met alleen deze concepten onder de knie kunnen we doorgaan naar het volgende deel: het definiëren van de kern-vertaalworkflow.

## 2. Kern-vertaalworkflow

In de kern zullen alle workflows met CMS'en de volgende structuur bevatten:

1. Content ophalen die vertaald moet worden.
2. De content verwerken (vertalen) naar de gewenste locales.
3. De vertaalde content naar de juiste entiteit- en locale-combinatie sturen.

De 3 P's van CMS-workflows (Pull, Process, Push) zullen altijd hun weg vinden in je birds.

![Schematisch](~/assets/guides/cms/1729004201270.png)

Het is aan jou om de belangrijkste beslissingen te nemen die, samen met de 3 P's, je bird zullen vormgeven:

- ❓ Welke content moet worden opgehaald en wanneer?
- ❓ In welke talen moet het worden vertaald?
- ❓ Welke app of dienst zal de content verwerken?

Wanneer je hebt besloten over deze aspecten, zul je zien dat Blackbird voor de rest zorgt, namelijk:

- ✔️ Automatisch de content converteren naar een HTML-bestand dat de entiteit nauwkeurig weergeeft, zodat het kan worden gebruikt voor TMS in-context vertaling of NMT-verwerking.
- ✔️ Taalcodes tussen verschillende systemen die nodig zijn om je bestand te verwerken in kaart brengen.
- ✔️ Wachten op langdurige verwerkingsstappen of menselijke interactie (bijv. wachten tot de vertaler de vertaling voltooit).
- ✔️ Automatisch vertaalde content naar de juiste entiteit-ID sturen zoals ingebed in het HTML-bestand.

### 2.1 Machinale verwerking

Laten we deze theoretische workflow in de praktijk brengen. In de onderstaande afbeelding zie je een voorbeeld van de pull-, process- en push-stappen met hun respectievelijke acties in Contentful. De **Get entry as HTML file** wordt gebruikt om een HTML-bestand op te halen dat de entry vertegenwoordigt. In dit geval wordt DeepL gebruikt om het bestand te verwerken (vertalen naar een andere taal). Daarna wordt de actie **Update entry from HTML file** gebruikt om het vertaalde HTML-bestand van DeepL te nemen en terug te sturen naar Contentful. Natuurlijk kan DeepL worden vervangen door elke andere enkelactie-verwerkingstoepassing en deze workflow zou er vergelijkbaar uitzien met andere CMS'en.

![Core met NMT](~/assets/guides/cms/1729083328505.png)

### 2.2 Mens-in-de-orkestratie

Het is meer dan waarschijnlijk dat alleen machinale verwerking niet aan je lokalisatiebehoeften voldoet. Het verwerken van je bestand kan natuurlijk een meerstapsproces zijn. Dit is bijna gegarandeerd het geval wanneer er een vorm van menselijke interactie of toezicht zal zijn. In het onderstaande voorbeeld verwerken we het bestand door het naar een Phrase TMS-project te sturen en te wachten tot de vertaling is voltooid. We gebruiken drie stappen om ons gewenste resultaat te bereiken. We maken eerst een nieuwe taak aan, dan wachten we tot de taak is voltooid met behulp van een [checkpoint](../../concepts/checkpoints). Vervolgens downloaden we het vertaalde bestand van Phrase TMS voordat we het terugsturen naar Contentful. Elke mens-in-de-orkestratie met een TMS of ander relevant systeem zal er vergelijkbaar uitzien.

> **💡 Opmerking**: Bekijk onze [checkpoints conceptgids](../../concepts/checkpoints) om meer te leren over checkpoints!

![Core met TMS](~/assets/guides/cms/1729083153924.png)

## 3. Continue lokalisatie

Je hebt geleerd hoe de kern-vertaalworkflow typisch wordt opgebouwd in een bird. Het is tijd om de eerste van drie grote beslissingen aan te pakken die je voor jezelf kunt invullen: ❓ *Welke content moet worden opgehaald en wanneer?*. Een use case waarvoor Blackbird zeer geschikt is, is continue lokalisatie. Kortom, een continu lokalisatieproces activeert lokalisatie workflows wanneer nieuwe content wordt gecreëerd. Je kunt dit bereiken met de juiste [trigger](../../concepts/triggers) in Blackbird!

Voor onze Contentful kern-vertaalworkflow hoeven we eigenlijk alleen maar een event aan te maken dat wordt geactiveerd wanneer nieuwe content wordt gecreëerd (of in ons geval gepubliceerd). Vervolgens wijzen we de **Get entry as HTML file** naar de entry-ID die we van het event ontvangen.

![Continue lokalisatie](~/assets/guides/cms/continuous.gif)

Dat is het! Continue lokalisatie afgevinkt. ✔️

De kritische lezer, Contentful-veteraan of beide, zal wijzen op een kleine fout in de workflow die we zojuist hebben gecreëerd: wanneer we onze gelokaliseerde content publiceren, wordt de workflow opnieuw geactiveerd, wat mogelijk een oneindige lus creëert. - Wel, petje af voor jou. Dit is een probleem dat op verschillende manieren wordt aangepakt in verschillende CMS'en. In Zendesk kun je bijvoorbeeld het publicatie-event filteren om alleen te luisteren naar publicaties in de brontaal. Contentful heeft echter geen dergelijke functie en alle publicaties zullen dit event activeren.

We raden aan om te kijken naar de ondersteunende functies die CMS'en hebben, zoals **tags** of **aangepaste velden** zoals eerder vermeld. Een populiere manier om hiermee om te gaan in Contentful is het gebruik van het tagsysteem. Je kunt filters toevoegen aan de entry-events in Blackbird, zodat alleen entries met een bepaalde tag de bird activeren. Een goede kandidaat zou kunnen zijn *Ready for localization*. Zorg ervoor dat je de tag aan het einde van je workflow verwijdert!

![Core met tags](~/assets/guides/cms/1729086551991.png)

## 4. Geplande en historische lokalisatie

Het is mogelijk dat continue lokalisatie niet helemaal je ding is. Misschien ben je geïnteresseerd in een meer traditionele lokalisatie workflow waarbij je nieuwe vertaalbare content op een terugkerend schema neemt, bijvoorbeeld eens per week. Of misschien wil je continue lokalisatie gebruiken, maar moet je ook entiteiten verwerken die in het verleden zijn gepubliceerd. In beide gevallen wil je een andere benadering hebben voor ❓ *Welke content moet worden opgehaald en wanneer?* Het wanneer zal ofwel een geplande trigger zijn of een handmatige trigger (wanneer je op de knop 'Fly' klikt in je bird). Het wat zal moeten worden gedefinieerd door een andere actie.

Elk CMS heeft een actie in de vorm van *Search entities*, die je kunt gebruiken om de exacte content te zoeken en selecteren die je wilt verwerken. Het komt meestal met verschillende filters, waaronder een *Updated from* en *Updated to* filter die je kunt gebruiken om het tijdsbereik te selecteren waarin de content mag worden bijgewerkt.

![Geplande memoQ](~/assets/guides/cms/1729090495297.png)

## 5. Meerdere talen verwerken

Tot nu toe heeft elke bird die we hebben gezien de content slechts naar één taal vertaald. Het is echter meer dan waarschijnlijk dat je eigenlijk naar meerdere talen wilt vertalen. In deze sectie behandelen we dus de vraag ❓ *In welke talen moet het worden vertaald?*

In het eenvoudigste scenario zijn de talen waarnaar je wilt vertalen vooraf gedefinieerd volgens een bepaalde overeenkomst. Meestal kun je deze talen dan "hardcoden" in de acties die ze vereisen. Het is ook waarschijnlijk dat je slim wilt zijn en de talen wilt krijgen zoals ze zijn gedefinieerd in het CMS. De meeste CMS-apps hebben een actie **Get locales** of **Get languages** die de standaardtaal en de andere geconfigureerde talen zal teruggeven. Dit is perfect! Want nu kun je die talen direct naar je verwerkingsapplicatie sturen.

![TMS talen](~/assets/guides/cms/1729176014667.png)

Er is een heel belangrijk punt om op te wijzen bij het verzenden van talen van het ene naar het andere systeem: ze gebruiken mogelijk niet dezelfde taalcodes. Daarom gebruiken we in de bovenstaande bird-sectie de **Convert operator** om van Contentful-taalcodes naar memoQ-taalcodes te converteren. Je kunt meer lezen over conversie en bibliotheken in [deze gids](../../concepts/libraries).

Een TMS kan meestal alle talen waarnaar je wilt converteren in één invoerveld nemen, aangezien het een project voor je content zou creëren. NMT en andere enkelvoudige verwerkingsapps nemen echter vaak maar één taal tegelijk. In dit geval moet je over alle talen itereren en ze voor elk bestand verwerken (zie gif hieronder). Je kunt meer informatie over loops vinden [hier](../loops).

![Continue lokalisatie](~/assets/guides/cms/multilocales.gif)

## 6. Contentful aandachtspunten

Elk CMS heeft zijn eigenaardigheden. Terwijl we Contentful hebben uitgelicht, kan het een goed moment zijn om wat dieper in de eigenaardigheden van Contentful te duiken. We raden altijd aan de [Blackbird Contentful documentatie](../../apps/contentful) te raadplegen voor de meest actuele versie.

### 6.1 Content selectie

Als een headless CMS is er een inherente disconnectie tussen hoe Contentful content weergeeft en hoe deze content uiteindelijk wordt weergegeven op een website en zichtbaar is voor de eindgebruiker. Het is aan een ontwikkelaar om deze link te creëren, maar **ze kunnen ervoor kiezen om sommige functies van Contentful te negeren**. Dit is vooral vervelend wanneer deze functies draaien om content en lokalisatie. Gelukkig kan het ophalen en versturen van content tussen Blackbird en Contentful zeer precies zijn, misschien zelfs preciezer dan een typische connector die je kunt vinden bij een TMS.

In Contentful kan men content van de ene entry in een andere entry insluiten. Dit wordt vaak gebruikt door teams die Contentful gebruiken om de redundantie van bepaalde content te verminderen. Het is nog steeds belangrijk dat wanneer een entry wordt vert