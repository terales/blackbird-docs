---
title: Cloud Storage to Machine Translation
description: Яйце з потенціалом створення рішення для передачі даних з хмарного сховища до машинного перекладу та назад
sidebar:
  label: Storage to MT
  order: 1
  hidden: false
---

### Eggs: Стартові точки для ваших Birds

У Blackbird.io Eggs (Яйця) є насінням або кресленнями для ваших робочих процесів. Вони представляють початкові ідеї, які мають потенціал перетворитися на повноцінні Birds (Птахи).

У цьому посібнику з Egg розглянемо деякі варіанти інтеграції хмарного сховища з машинним перекладом. [Знайдіть **Завантажувані Eggs** наприкінці!](https://docs.blackbird.io/eggs/storage-to-mt/#download-an-egg)

## Схема процесу

1. **Тригер: Файл(и) завантажено в хмарне сховище**
Користувачі завантажують файли у вибране хмарне сховище. Ця дія запускає наш робочий процес.
2. **Завантаження файлу**
Файли завантажуються з хмарного сховища.
3. **Машинний переклад**
Завантажені файли надсилаються до системи машинного перекладу для швидкої обробки.
4. **Завантаження перекладеного файлу**
Перекладені файли завантажуються назад у хмарне сховище та розміщуються у визначеній папці виводу.

Egg між Google Drive та DeepL
![Egg](~/assets/docs/eggs/Eggs1.png)

## Поради

- **Події опитування:** Деякі додатки використовують [опитування](https://docs.blackbird.io/concepts/triggers/#polling) замість вебхуків для виявлення оновлених/нових файлів. Перевірте наявність вкладки _Interval_ під час налаштування тригера та виберіть відповідний час для вас (від 5 хвилин до 7 днів).
- **Інтеграція глосарію:** Коли додаток машинного перекладу дозволяє, користувачі можуть додавати глосарії для підвищення точності та узгодженості перекладу. Глосарії можна експортувати з різних додатків, і Blackbird забезпечить сумісність (включаючи TMS і CAT інструменти, [таблиці Microsoft Excel](https://docs.blackbird.io/apps/microsoft-excel/#exporting-glossaries), [DeepL](https://docs.blackbird.io/apps/deepl/#glossaries), [OpenAI](https://docs.blackbird.io/apps/openai/#glossary-extraction)).
- **Цільова мова:** Ви можете вибрати мову з динамічних входів додатку машинного перекладу, який використовуєте. Ви також можете використовувати оператори для циклічного перебору списку попередньо визначених мов (див. Egg з кількома мовами [внизу сторінки](https://docs.blackbird.io/eggs/storage-to-mt/#download-an-egg) та масиви з кількома мовами відразу під розділом Поради). Крім того, ви також можете отримати цю інформацію з іншого додатку/дії. Все залежить від того, як виглядає ваш процес.
- **Необов'язкові параметри:** Багато додатків машинного перекладу пропонують різні параметри для налаштування, такі як словники, формальність та користувацький двигун. Перевірте вкладку вхідних даних для всіх кроків.
- **Налаштування папки виводу:** При завантаженні файлів назад у хмарне сховище за вашим вибором, обов'язково налаштуйте нову папку, щоб запобігти перезапису оригінальних файлів або створенню нескінченного циклу, коли перекладені файли слугують новим тригером і повторно обробляються.
- **Використовуйте правильний ввід:** При повторному завантаженні файлу переконайтеся, що ви вибрали правильний ввід. Якщо ви виберете експортований файл, то ви будете імпортувати точно такий самий файл без змін. Виберіть натомість вихідний файл з дії перекладу.
- **Цикли необхідні:** Чи то для ітерації через список цільових мов, чи для надсилання кожного файлу з групи завантажених файлів до дії, яка приймає лише один за раз, [цикли](https://docs.blackbird.io/guides/loops/) є ключовими.
- **Перейменування файлів:** Ви можете змінювати імена файлів перед повторним завантаженням. Якщо ви хочете додати код цільової мови в кінці назви файлу або вказати через назву файлу, що він був перекладений машинним перекладом, ви можете використовувати додаток [Utilities](https://docs.blackbird.io/apps/utilities/) або інші [помічники](https://docs.blackbird.io/guides/toolbox/). Приклад робочого процесу для завантаження знаходиться [внизу сторінки](https://docs.blackbird.io/eggs/storage-to-mt/#download-an-egg).

Egg між Google Drive та DeepL з глосаріями.
![Egg with Glossary](~/assets/docs/eggs/Eggs1_withGlossary.png)

Додавання масиву мовних кодів до циклу.
![Multiple languages](~/assets/docs/eggs/MultipleLangs.png)

## Рекомендовані додатки

### Cloud Storage

- [Dropbox](https://docs.blackbird.io/apps/dropbox/)
- [Amazon S3](https://docs.blackbird.io/apps/amazon-s3/)
- [Box](https://docs.blackbird.io/apps/box/)
- [Google Drive](https://docs.blackbird.io/apps/google-drive/)
- [Microsoft SharePoint](https://docs.blackbird.io/apps/microsoft-sharepoint/)
- [SFTP](https://docs.blackbird.io/apps/sftp/)

### Machine Translation

- [Language Weaver](https://docs.blackbird.io/apps/language-weaver/)
- [DeepL](https://docs.blackbird.io/apps/deepl/)
- [Amazon Translate](https://docs.blackbird.io/apps/amazon-translate/)
- [GlobalLink NOW](https://docs.blackbird.io/apps/globallink-now/)
- [Google Translate](https://docs.blackbird.io/apps/google-translate/)

Egg між Dropbox та GlobalLink NOW
![Egg GL NOW](~/assets/docs/eggs/Eggs1_GlobalLinkNow.png)

Egg між Amazon S3 та Lanugage Weaver
![Egg S3 Language Weaver](~/assets/docs/eggs/Eggs1_S3toLanguageWeaver.png)

## Завантажте Egg

Завантажте робочі процеси JSON для імпорту у ваш Nest, внесіть будь-які бажані корективи та **запускайте**.

- <a href="https://docs.blackbird.io/downloads/Sharepoint_to_Amazon_Translate_and_back.json" download>SharePoint to Amazon Translate and back</a>
- <a href="https://docs.blackbird.io//downloads/AmazonS3_to_Language_Weaver.json" download>Amazon S3 to Language Weaver</a>  
- <a href="https://docs.blackbird.io//downloads/Dropbox_to_GlobalLink_NOW_set_multiple_languages.json" download>Dropbox to GlobalLink NOW set multiple languages</a>  
- <a href="https://docs.blackbird.io//downloads/Dropbox_to_GlobalLink_NOW_and_back.json" download>Dropbox to GlobalLink NOW and back</a>  
- <a href="https://docs.blackbird.io//downloads/Google_Drive_to_DeepL_and_back.json" download>Google Drive to DeepL and back</a>  
- <a href="https://docs.blackbird.io//downloads/Google_Drive_to_DeepL_with_Phrase_Glossary_and_back.json" download>Google Drive to DeepL with Phrase Glossary and back</a>  
- <a href="https://docs.blackbird.io//downloads/SFTP_to_Google_Translate_with_file_renaming.json" download>SFTP to Google Translate with file renaming</a>

### Імпорт Eggs

Щоб імпортувати Egg у ваш Nest:

1. Перейдіть до розділу Bird Editor.
2. Натисніть на Import у верхньому правому куті.
3. Виберіть файл Egg (JSON) для імпорту та натисніть `Import`.
4. Знайдіть новостворений Bird та натисніть на нього для редагування.
5. Оновіть деталі підключення та будь-які інші необхідні параметри введення/виведення або бажані кроки. Зверніть увагу на червоні попереджувальні знаки поруч з назвою кроку, які сигналізують про відсутність деталей у цьому кроці.
6. Натисніть Зберегти/Опублікувати.

![Importing Eggs](~/assets/docs/eggs/ImportEggs.gif)