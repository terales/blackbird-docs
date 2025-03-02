---
title: Entity Linking
description: Nu je hebt gezien hoe je entiteiten kunt koppelen met behulp van de mogelijkheden van een systeem, laten we eens kijken hoe we workflows kunnen bouwen die meerdere birds omvatten met behulp van entity linking.
sidebar:
  label: Entity Linking
  order: 3
  hidden: false
---

> **🚨 BELANGRIJKE OPMERKING 🚨 Kijk altijd eerst naar het gebruik van [checkpoints](/blackbird-docs/concepts/checkpoints/) in plaats van entity linking. Checkpoints is een nieuwere functie met als doel entity linking volledig af te schaffen, waardoor entity linking in de toekomst mogelijk uit Blackbird zal worden verwijderd.** 

Nu je in de vorige handleiding het concept van een gekoppelde entiteit tussen verschillende systemen en platforms hebt geleerd, is het tijd om te kijken hoe je entiteiten kunt koppelen zonder afhankelijk te zijn van de mogelijkheid van een bepaald systeem om aangepaste waarden op te slaan. Blackbird biedt je namelijk de mogelijkheid om deze entiteiten te koppelen via een speciale operator, toepasselijk genaamd _Link entities_. Maar eerst een korte samenvatting van de vorige handleiding:

## TLDR; wat zijn gekoppelde entiteiten?

Bij het verbinden van verschillende systemen ontdekken we vaak dat iets dat in het ene systeem wordt weergegeven semantisch hetzelfde is als iets dat in een ander systeem wordt weergegeven. Denk aan een artikel in een CMS dat wordt vertegenwoordigd door een bestand in een TMS, een klant in je BMS die wordt vertegenwoordigd door een klant in je CRM, of zelfs een Slack-bericht dat een vertaalproject vertegenwoordigt!

Als we het CMS-artikel <> TMS-bestand als voorbeeld nemen, kunnen we een zeer gebruikelijk patroon identificeren: wanneer een TMS-project wordt gemaakt, voegen we bestanden toe die overeenkomen met CMS-artikelen. Vervolgens, wanneer de vertalingen voltooid zijn, moeten we elk artikel bijwerken met het juiste vertaalde bestand. Ervan uitgaande dat de workflow voor voltooide vertaling verschilt van de workflow voor het maken van het vertaalproject, zouden we onszelf de vraag moeten stellen: **gegeven dit vertaalde bestand dat ik van mijn TMS heb ontvangen, met welk artikel kwam het overeen?** We hebben een antwoord op deze vraag nodig om de vertaling op de juiste plaats terug te zetten.

Als we geen aangepaste eigenschappenbenadering gebruiken zoals in de laatste handleiding, moeten we gebruik maken van Blackbird's eigen _Link entities_ operator.

> Als een systeem aangepaste eigenschappen toestaat, raden we je altijd aan deze te gebruiken in plaats van Blackbird's eigen gekoppelde entiteiten, zodat je meer controle hebt over het bewerken van deze eigenschappen indien nodig.

## Ons scenario

We zullen deze operator stap voor stap doorlopen. Maar laten we eerst de workflow definiëren die we gaan bouwen. We gaan ervan uit dat dit een gesplitste workflow is, wat betekent dat een deel van de workflow is gebaseerd op één trigger, en een tweede deel van de workflow door een andere trigger. We kunnen het als volgt definiëren:

> _Wanneer er een nieuwe Jira-ticket wordt aangemaakt, neem de bijlagen en andere informatie en voeg ze toe aan een Phrase-taak._

Vervolgens:

> _Wanneer die Phrase-taak is voltooid, werk de Jira-ticket bij en upload de vertalingen._

Zonder op de details in te gaan, ziet het eerste deel van de workflow er als volgt uit:

![Initial](../../../../assets/guides/linking/initial.png)

We gebruiken een lus over alle bijlagen in de issue, downloaden vervolgens de bijlage en maken hiervan een Phrase-taak, samen met de taal die uit een dropdown in Jira was geselecteerd.

Dan zal het tweede deel van de workflow er zo uitzien:

![Missing key](../../../../assets/guides/linking/missing-key.png)

We downloaden het vertaalde bestand en willen het vervolgens toevoegen aan onze Jira-ticket. We worden nu echter geconfronteerd met precies hetzelfde probleem dat we eerder noemden: **gegeven deze voltooide taak, met welke issue kwam deze overeen?**

> Alle gebruiksgevallen voor entity linking hebben dezelfde vorm: _x_ komt overeen met _y_, ik heb _x_, wat is _y_?

## 1. Het koppelen van de entiteiten wanneer ze worden gemaakt.

Om deze vraag te beantwoorden, moeten we nog een stap toevoegen aan onze eerste workflow. Namelijk, we moeten de koppeling tussen deze twee entiteiten tot stand brengen.

Klik op het pictogram `+` en selecteer _Operator_. Selecteer vervolgens in het menu aan de rechterkant _Entity connection_.

![Connection](../../../../assets/guides/linking/connection.png)

Selecteer vervolgens voor type _Link entities_. We moeten nu de namen en de ID's van onze twee entiteiten definiëren. We raden aan om herkenbare namen te gebruiken. In ons geval gebruiken we `Jira_issue` en we selecteren de _Issue key_ (wat de ID is voor de issue die we in onze tweede bird willen hebben), en we koppelen het aan `Phrase_job` en voegen de _UID_ toe van de Phrase-taak die we zojuist hebben gemaakt.

![Setup](../../../../assets/guides/linking/setup.png)

Klaar! We kunnen deze bird nu uitvoeren en verifiëren dat deze succesvol werkt. Wanneer we de operator _Link entities_ aan onze bird hebben toegevoegd, kunnen we deze koppeling nu in onze andere bird gebruiken.

> **Opmerking**: Je moet een bird met een gekoppelde entiteit minimaal één keer succesvol uitvoeren voordat de entiteitsnamen in de volgende stap verschijnen!

## 2. Het gebruiken van de entiteitskoppeling.

Laten we teruggaan naar de bird die verantwoordelijk is voor het terugplaatsen van de vertalingen in Jira. Tussen de Phrase- en Jira-acties kunnen we nu opnieuw de operator _Entity connection_ toevoegen. Deze keer kiezen we in plaats van _Link entities_ als type voor _Get linked entity_.

![Get entity](../../../../assets/guides/linking/get-entity.png)

Wanneer we op _name_ klikken, zien we een dropdown met alle verschillende entiteitstypes die Blackbird voor je heeft opgeslagen. We weten dat we een Phrase-taak hebben en een Jira-issue willen, daarom selecteren we `Phrase_job` en vullen we de taak-ID in die we via de gebeurtenis hebben ontvangen. Vervolgens selecteren we voor gekoppelde entiteit `Jira_issue`.

Hoera! We hebben nu de gekoppelde entiteit opgehaald!

We kunnen deze ID (die in ons geval de Jira-issue-sleutel vertegenwoordigt) nu gebruiken in onze laatste actie om de bird te voltooien.

![Complete](../../../../assets/guides/linking/complete.png)

Et voilà, wanneer de Phrase-taak is voltooid, zien we nu onze bijlagen terug in de juiste Jira-ticket! 🎉

> We zullen later dit jaar werken aan een functie die veel van deze scenario's met gesplitste workflows mogelijk kan vervangen. We kijken naar het toevoegen van zogenaamde _in-bird-events_ waarmee je een gesplitste workflow kunt voortzetten alsof het één geheel was. In de meeste (zo niet alle) gevallen kan dit de noodzaak voor entity linking wegnemen.