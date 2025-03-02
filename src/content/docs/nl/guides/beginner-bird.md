---
locale: nl
title: Beginner Bird - Je eerste Bird stap voor stap bouwen
description: Om een expert vogelkijker te worden moet je ergens beginnen. Deze gids is voor Blackbird-beginners en brengt je op de hoogte van de basisprincipes van het bouwen van birds.
sidebar:
  label: Beginner Bird Stap voor Stap
  order: 1
---

Om een expert vogelkijker te worden moet je ergens beginnen. Deze gids is voor Blackbird-beginners en brengt je op de hoogte van de basisprincipes van het bouwen van birds.

Deze gids leert je de algemene aanpak voor elke workflow die je wilt automatiseren met Blackbird. We doen dit stap voor stap, dus we moedigen je aan om mee te doen met je eigen Blackbird-account! We gebruiken de [Slack](../../apps/slack), [DeepL](../../apps/deepl) en [OpenAI](../../apps/openai) apps. Wanneer je wordt gevraagd om inloggegevens, kun je in de bijbehorende documentatiesecties bekijken hoe je verbinding maakt. Je kunt natuurlijk ook alternatieven voor deze apps gebruiken, bijvoorbeeld [Amazon Translate](../../apps/amazon-translate) in plaats van DeepL.

Aan het einde van deze gids heb je een Slack-bot gebouwd die reageert op je berichten in Slack in een andere taal. Dit is volgens onze ervaring de leukste eerste bird die je kunt bouwen! Natuurlijk is het niet echt toepasbaar op _echte wereld_ scenario's (hoewel elementen ervan dat wel kunnen zijn). In latere gidsen leer je meer over hoe je productie-birds kunt aanpakken en hoe je lokalisatie-gerelateerde workflows kunt opzetten.

## Stap 1: Een bird die een bericht verstuurt

Navigeer naar de birds-pagina en klik op de grote paarse knop **Create**. Dit opent de bird-editor. Je wordt begroet door het volgende scherm.

![Empty bird](~/assets/guides/beginner-bird/empty.png)

Laten we de elementen op het scherm doornemen:

- Het midden van je scherm toont de trigger, en later alle acties die worden uitgevoerd. Met het **+** pictogram kun je acties en andere workflow-gerelateerde stappen maken.
- De rechterkant van het scherm toont de details van je geselecteerde stap. Op dit moment is de stap **New trigger** geselecteerd, zodat je deze kunt configureren.
- Boven de workflow zie je de naam van je bird en een knop met 3 puntjes (**...**), deze knop wordt gebruikt om de metadata van de bird te beheren. Van hieruit kun je de bird hernoemen, exporteren, klonen en kopiëren. Het zal ook beschikbare updates van apps tonen als die er zijn.

Om de eenvoudigste bird mogelijk te bouwen, selecteren we **Manual trigger** aan de rechterkant van het scherm. Een handmatige trigger betekent dat we deze bird vanuit Blackbird kunnen triggeren door op een knop te klikken.

![Manual trigger](~/assets/guides/beginner-bird/manual_trigger.png)

Nu is het tijd om onze eerste actie te definiëren. We doen dit door op het **+** pictogram in het midden van het scherm te klikken en **Action** te selecteren.

![Action](~/assets/guides/beginner-bird/action.png)

Je ziet een nieuwe actie onder je trigger. De actie is echter nog leeg en we moeten definiëren wat we willen doen met welke app en welke verbinding.
Ga verder en klik op app aan de rechterkant van je scherm. Zoek naar de app waarvoor je de actie wilt toevoegen. In ons geval is dit _Slack_.

![Action added](~/assets/guides/beginner-bird/action_added.png)

Na het definiëren van de app moeten we nu de actie definiëren die we willen uitvoeren. We gaan een bericht versturen in Slack, dus zoek naar _Send message_ en selecteer het.
Tot slot selecteren we de verbinding. Je kunt op **Add new connection** klikken als je nog geen Slack-verbinding hebt gemaakt.

Het eindresultaat zou er zo uit moeten zien:

![Action added](~/assets/guides/beginner-bird/action_configured.png)

Nu we weten wat we moeten doen, moeten we Blackbird vertellen welke informatie we willen versturen. Klik op de paarse knop **Continue**, of op het tabblad dat **Inputs** zegt.

Je acties hebben extra informatie nodig om uitgevoerd te worden. Sommige van deze informatie is vereist, sommige is optioneel. We kunnen in de onderstaande afbeelding zien dat de _Channel ID_ een vereiste parameter is voor de actie: Blackbird wil weten naar welk kanaal het bericht moet worden verzonden.

![Send message](~/assets/guides/beginner-bird/send_message.png)

Bij het doorgeven van informatie aan een actie moeten we ons ervan bewust zijn dat deze informatie uit een van twee plaatsen kan komen:

- Als de informatie afkomstig is van een actie of gebeurtenis die _vóór_ deze actie plaatsvindt, dan selecteer je het toverstafpictogram voor het informatieveld. De toverstaf geeft aan dat Blackbird gegevens zal gebruiken die het resultaat waren van andere acties of gebeurtenissen tijdens de uitvoering van je workflow.
- Als de informatie _statisch_ is en alleen wordt gedefinieerd terwijl je de bird bouwt, dan gebruiken we ofwel de dropdown of tekstinvoer.

> **💡 Opmerking**: het verschil tussen dropdown en tekstinvoer wordt gedefinieerd in de Blackbird-app en is gebaseerd op of de informatie die legaal kan worden ingevoerd eindig is (in dat geval is er een dropdown) of oneindig (in dat geval kun je de informatie zelf typen).

Laten we de _Channel ID_ definiëren die Blackbird van ons wil. De kanalen die mogelijke waarden zijn voor deze parameter zijn eindig en vooraf gedefinieerd. Daarom, wanneer je op **Select input data** klikt, zal Blackbird je daadwerkelijk de kanalen tonen die beschikbaar zijn voor jou vanuit de verbinding!

![Channels](~/assets/guides/beginner-bird/channels.png)

Je kunt typen in het zoekvak om je zoekopdracht te verfijnen. Selecteer een kanaal dat je wilt gebruiken voor deze bird, in ons geval gaan we gewoon het kanaal _#general_ selecteren.

We hebben gedefinieerd naar welk kanaal het bericht moet worden verzonden, geweldig! Nu moeten we Blackbird ook vertellen welk bericht we willen versturen. Klik op **Add input** om een dropdown te zien van alle mogelijke optionele inputs. Selecteer **Message**. Typ nu een bericht dat je wilt versturen. In ons geval gaan we _Hello from Blackbird!_ versturen. Je kunt elk bericht typen dat je wilt (aangegeven door het toetsenbordpictogram).

> **💡 Opmerking**: In Slack is het niet mogelijk om een bericht te versturen zonder een daadwerkelijke berichttekst of een bijlage. De reden dat het bericht nog steeds optioneel is, is omdat je ook een bijlage zou kunnen versturen zonder een begeleidende tekst.

Je actie zou er nu ongeveer zo uit moeten zien:

![Send message complete](~/assets/guides/beginner-bird/send_message_complete.png)

Dat is het! Nu is het tijd om je eerste bird te laten vliegen. Je doet dit door op de paarse **Fly** knop bovenaan het scherm te klikken.

![Fly](~/assets/guides/beginner-bird/fly.png)

Je zou bijna direct het bericht in je Slack-kanaal moeten zien!

![From Slack](~/assets/guides/beginner-bird/from_slack.png)

Het is nu ook mogelijk om de uitvoering van deze bird in Blackbird te verifiëren. We doen dit door op **Show Flights** naast de fly-knop te klikken. Je ziet een lijst met flights. Door op een flight te klikken kun je elke gebeurtenis en actie die is uitgevoerd inspecteren. Door op een actie te klikken kun je ook de input- en outputwaarden zien die werden doorgegeven.

## Stap 2: Een vertaling versturen

Laten we een tweede stap aan de bird toevoegen. We willen eerst een zin vertalen met DeepL, en dan de vertaling naar ons Slack-kanaal sturen. Om dit te doen, moeten we een nieuwe actie toevoegen. Deze actie moet _vóór_ we het bericht naar Slack sturen gebeuren. Daarom maken we een nieuwe actie tussen de trigger en **Send message**. Klik op het **+** pictogram en selecteer opnieuw actie.

![Action in between](~/assets/guides/beginner-bird/action_in_between.png)

Deze keer selecteren we niet Slack als onze app maar DeepL. Selecteer vervolgens de actie **Translate** en je verbinding (maak er een aan als je er nog geen hebt). Je scherm zou er dan zo uit moeten zien:

![DeepL Added](~/assets/guides/beginner-bird/deepl_added.png)

Het is tijd om de informatie weer in te vullen door op **Continue** te klikken. Deze keer zijn twee velden vereist: _Text_ en _Target language_. We zijn vrij om elke tekst te typen die we willen, we zien ook dat _Target language_ ons een dropdown zal presenteren. Vul een tekst in om te vertalen en selecteer een doeltaal, in dit geval gaan we voor _Hello from Blackbird!_ en _Spanish_.

![Translate filled](~/assets/guides/beginner-bird/translate_filled.png)

> **💡 Opmerking**: Bij het inspecteren van de optionele waarden zien we dat DeepL veel meer informatie kan opnemen, voel je vrij om deze opties te verkennen!

We zijn bijna klaar om te vliegen. Bijna, want nu komt het belangrijkste deel! We kunnen verwachten dat DeepL ons een vertaling terugstuurt, we moeten nu Blackbird vertellen om die vertaling te nemen en in ons Slack-bericht te sturen.

We doen dit door terug te gaan naar onze Send message actie door erop te klikken. Je ziet dat het bericht dat we versturen nog steeds het bericht is dat we eerder hebben getypt. Weet je nog dat toverstafpictogram? Laten we het nu gebruiken!

Klik op de toverstaf voor het veld _Message_. Het invoerveld verandert nu in een dropdown. Klik op de dropdown en je krijgt de informatie te zien die van DeepL terugkomt.

![Slack DeepL input](~/assets/guides/beginner-bird/slack_deepl_input.png)

Je merkt misschien op dat Blackbird je ook waarschuwt dat je workflow onvolledig is. Laten we snel op **Translated text** klikken, want dat is de informatie die we van DeepL naar Slack willen sturen. Nadat je dit hebt gedaan, zou alles er goed uit moeten zien en is het tijd om opnieuw op de **Fly** knop te klikken!

![Result Spanish](~/assets/guides/beginner-bird/result_spanish.png)

🥳 ¡Felicidades! Je hebt zojuist een bird gemaakt die het belangrijkste aspect van Blackbird demonstreert: informatie van de ene applicatie nemen en doorgeven aan de andere. Voel je vrij om nogmaals op _Show Flights_ te klikken om alle informatie over de flight te zien. Ben je na dat gedaan te hebben klaar om het naar een hoger niveau te tillen?

## Stap 3: Reageren op een bericht

Tot nu toe hebben we deze bird getriggerd door op de **Fly** knop te klikken. Zou het niet veel leuker zijn als deze bird daadwerkelijk triggert op berichten die in Slack worden verzonden?
Het is tijd om deze handmatige trigger te veranderen. Wat we willen bereiken is dat als iemand een bericht naar een kanaal stuurt terwijl hij _@Blackbird_ tagt, deze bird zal vliegen en het bericht voor je zal vertalen.

Laten we beginnen door op de **Manual trigger** te klikken. Aan de rechterkant kunnen we deze nu veranderen in een **Event trigger**. Event trigger betekent altijd dat we triggeren op basis van dingen die in verbonden applicaties gebeuren.

![Event trigger](~/assets/guides/beginner-bird/event_trigger.png)

In tegenstelling tot de handmatige trigger vereist de event trigger wel wat configuratie. Nadat je op **Continue** hebt geklikt, krijg je een vertrouwd menu te zien. Het is tijd om de app, gebeurtenis en verbinding te selecteren. Voor app selecteer je Slack en voor de gebeurtenis selecteer je **On app mentioned**

![Trigger config](~/assets/guides/beginner-bird/trigger_config.png)

> **⚠️ Waarschuwing**: je bent misschien geneigd om de gebeurtenis **on message** te gebruiken. Dit zou echter een vergissing zijn, aangezien we tijdens deze bird ook een bericht terug naar Slack gaan sturen, wat op zijn beurt weer de bird zou triggeren. Dat is een oneindige lus! Je zult merken dat je bewust zijn van scenario's zoals deze het daadwerkelijk moeilijke deel van _Solution architecting_ gaat worden.

Als we de bird zo zouden publiceren, zou Blackbird reageren op elk bericht waarin het getagd wordt _in elk kanaal_. Als je wilt dat Blackbird alleen naar een specifiek kanaal luistert, klik dan op **Inputs** en selecteer een kanaal voor **Channel ID**.

![Slack event input](~/assets/guides/beginner-bird/slack_event_input.png)

Nu we de trigger hebben veranderd in een gebeurtenis, zien we de **Fly** knop niet meer. In plaats daarvan zien we **Save** en na het klikken op **Save** zien we **Publish**.

![Publish](~/assets/guides/beginner-bird/publish.png)

Ga verder en klik op **Publish**. Achter de schermen neemt Blackbird nu contact op met Slack en vertelt het dat Slack Blackbird moet informeren wanneer een gebruiker een bericht stuurt waarin het wordt vermeld.

Laten we het in actie zien! Ga naar je kanaal en stuur een bericht waarin je _@Blackbird_ tagt.

> **💡 Opmerking** je hebt misschien in de Slack-documentatie gelezen dat voor events de Slack-app moet worden toegevoegd aan een kanaal. Je kunt dit doen via het Slack-kanaalmenu, of door een bericht te sturen met _@Blackbird_, Slack zal je dan vragen of je de app aan dat kanaal wilt toevoegen. Ga akkoord.

![Oops](~/assets/guides/beginner-bird/message_oops.png)

Oeps! Je ziet dat we de bird hebben veranderd om te triggeren wanneer we een bericht sturen dat _@Blackbird_ bevat. Het doet echter nog niet wat we