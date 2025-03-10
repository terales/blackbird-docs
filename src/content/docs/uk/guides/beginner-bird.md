---
locale: uk
title: Beginner Bird - Крок за кроком будуємо свій перший Bird
description: Щоб стати експертом з перегляду птахів, треба з чогось почати. Цей посібник призначений для новачків у Blackbird і допоможе вам засвоїти основи побудови птахів.
sidebar:
  label: Beginner Bird крок за кроком
  order: 1
---

Щоб стати експертом з перегляду птахів, треба з чогось почати. Цей посібник призначений для новачків у Blackbird і допоможе вам засвоїти основи побудови птахів.

Цей посібник навчить вас загального підходу до будь-якого робочого процесу, який ви можете автоматизувати за допомогою Blackbird. Ми будемо робити це крок за кроком, тому вам рекомендується паралельно працювати з власним обліковим записом Blackbird! Ми будемо використовувати додатки [Slack](../../apps/slack), [DeepL](../../apps/deepl) та [OpenAI](../../apps/openai). Коли вам буде потрібно ввести облікові дані для підключення, ви можете переглянути, як підключитися, у відповідних розділах документації. Звичайно, ви також можете використовувати альтернативи цим додаткам, наприклад, [Amazon Translate](../../apps/amazon-translate) замість DeepL.

До кінця цього посібника ви створите бота для Slack, який відповідатиме на ваші повідомлення іншою мовою. За нашим досвідом, це найцікавіший перший bird, який ви можете створити! Звичайно, це не дуже застосовно до _реальних_ сценаріїв (хоча його елементи можуть бути). У наступних посібниках ви дізнаєтеся більше про те, як підходити до створення промислових birds і як налаштувати робочі процеси, пов'язані з локалізацією.

## Крок 1: Bird, який надсилає повідомлення

Перейдіть на сторінку birds і натисніть велику фіолетову кнопку **Create**. Відкриється редактор bird. Ви побачите наступний екран.

![Empty bird](~/assets/guides/beginner-bird/empty.png)

Розглянемо елементи на екрані:

- У центрі екрана ви бачите тригер, а пізніше всі дії, які виконуються. Значок **+** дозволить вам створювати дії та інші кроки, пов'язані з робочим процесом.
- У правій частині екрана відображаються деталі вибраного кроку. Зараз вибрано крок **New trigger**, тому ви можете його налаштувати.
- Над робочим процесом ви бачите назву свого bird і кнопку з 3 крапками (**...**), ця кнопка використовується для керування метаданими bird. Звідси ви можете перейменувати, експортувати, клонувати та копіювати bird. Тут також відображатимуться доступні оновлення додатків, якщо такі є.

Щоб створити найпростіший bird, ми виберемо **Manual trigger** у правій частині екрана. Ручний тригер означає, що ми можемо запустити цей bird з Blackbird, натиснувши кнопку.

![Manual trigger](~/assets/guides/beginner-bird/manual_trigger.png)

Тепер час визначити нашу першу дію. Ми робимо це, натискаючи на значок **+** у центрі екрана та вибираючи **Action**.

![Action](~/assets/guides/beginner-bird/action.png)

Ви побачите нову дію під вашим тригером. Однак дія ще порожня, і ми повинні визначити, що робити з яким додатком і з яким підключенням.
Перейдіть до пункту "додаток" у правій частині екрана. Знайдіть додаток, для якого ви хочете додати дію. У нашому випадку це _Slack_.

![Action added](~/assets/guides/beginner-bird/action_added.png)

Після визначення додатка тепер нам потрібно визначити дію, яку ми хочемо виконати. Ми збираємося надіслати повідомлення у Slack, тому шукаємо _Send message_ і вибираємо його.
Нарешті, ми вибираємо підключення. Ви можете натиснути **Add new connection**, якщо ви ще не створили підключення до Slack.

Кінцевий результат повинен виглядати так:

![Action added](~/assets/guides/beginner-bird/action_configured.png)

Тепер, коли ми знаємо, що робити, ми повинні сказати Blackbird, яку інформацію надсилати. Натисніть фіолетову кнопку **Continue** або на вкладку **Inputs**.

Для виконання ваших дій потрібна додаткова інформація. Деяка з цієї інформації є обов'язковою, деяка - необов'язковою. На зображенні нижче ми бачимо, що _Channel ID_ є обов'язковим параметром для дії: Blackbird хоче знати, на який канал слід надіслати повідомлення.

![Send message](~/assets/guides/beginner-bird/send_message.png)

Передаючи інформацію в дію, ми повинні пам'ятати, що ця інформація може надходити з одного з двох місць:

- Якщо інформація надходить від дії або події, яка відбувається _перед_ цією дією, тоді вам слід вибрати значок чарівної палички перед полем інформації. Чарівна паличка означає, що Blackbird буде використовувати дані, які були результатом інших дій або подій під час виконання вашого робочого процесу.
- Якщо інформація _статична_ і визначається лише під час створення bird, тоді ми використовуємо або випадний список, або текстове поле.

> **💡 Примітка**: різниця між випадним списком і текстовим полем визначається в додатку Blackbird і залежить від того, чи інформація, яку можна юридично ввести, є обмеженою (у цьому випадку є випадний список) або необмеженою (у цьому випадку ви можете ввести інформацію самостійно).

Давайте визначимо _Channel ID_, який Blackbird хоче від нас. Канали, які є можливими значеннями для цього параметра, обмежені і попередньо визначені. Тому, коли ви натиснете на **Select input data**, Blackbird фактично покаже вам канали, які доступні вам із підключення!

![Channels](~/assets/guides/beginner-bird/channels.png)

Ви можете ввести текст у полі пошуку, щоб звузити пошук. Виберіть канал, який ви хочете використовувати для цього bird, у нашому випадку ми просто виберемо канал _#general_.

Ми визначили, на який канал надіслати повідомлення, чудово! Тепер нам також потрібно сказати Blackbird, яке повідомлення надіслати. Натисніть **Add input**, щоб побачити випадний список усіх можливих необов'язкових вхідних даних. Виберіть **Message**. Тепер введіть повідомлення, яке ви хочете надіслати. У нашому випадку ми надішлемо _Hello from Blackbird!_ Ви можете ввести будь-яке повідомлення (вказане значком клавіатури).

> **💡 Примітка**: У Slack неможливо надіслати повідомлення без фактичного тексту повідомлення або вкладення. Причина, з якої повідомлення все ще необов'язкове, полягає в тому, що ви також можете надіслати вкладення без супроводжуючого тексту.

Тепер ваша дія повинна виглядати приблизно так:

![Send message complete](~/assets/guides/beginner-bird/send_message_complete.png)

Це все! Тепер настав час запустити ваш перший bird. Ви робите це, натиснувши фіолетову кнопку **Fly** у верхній частині екрана.

![Fly](~/assets/guides/beginner-bird/fly.png)

Ви повинні майже миттєво побачити повідомлення у вашому каналі Slack!

![From Slack](~/assets/guides/beginner-bird/from_slack.png)

Тепер також можна перевірити виконання цього bird у Blackbird. Ми робимо це, натиснувши на **Show Flights** поруч із кнопкою "Fly". Ви побачите список польотів. Натиснувши на політ, ви можете перевірити кожну подію та дію, яка виконалася. Натиснувши на дію, ви також можете побачити вхідні та вихідні значення, які були передані.

## Крок 2: Надсилання перекладу

Додамо другий крок до bird. Ми хочемо спочатку перекласти речення за допомогою DeepL, а потім надіслати переклад у наш канал Slack. Для цього нам потрібно додати нову дію. Ця дія повинна відбутися _перед_ тим, як ми надішлемо повідомлення до Slack. Тому ми створюємо нову дію між тригером і **Send message**. Натисніть на значок **+** і знову виберіть дію.

![Action in between](~/assets/guides/beginner-bird/action_in_between.png)

Цього разу ми вибираємо не Slack як наш додаток, а DeepL. Потім виберіть дію **Translate** і ваше підключення (створіть його, якщо у вас ще немає). Ваш екран повинен виглядати так:

![DeepL Added](~/assets/guides/beginner-bird/deepl_added.png)

Настав час знову ввести інформацію, натиснувши **Continue**. Цього разу обов'язковими є два поля: _Text_ і _Target language_. Ми можемо ввести будь-який текст, який хочемо, ми також бачимо, що _Target language_ представить нам випадний список. Введіть текст для перекладу та виберіть цільову мову, у цьому випадку ми вибираємо _Hello from Blackbird!_ і _Spanish_.

![Translate filled](~/assets/guides/beginner-bird/translate_filled.png)

> **💡 Примітка**: Перевіряючи необов'язкові значення, ми бачимо, що DeepL може отримувати набагато більше інформації, не соромтеся досліджувати ці опції!

Ми майже готові до запуску. Майже, тому що зараз настає найважливіша частина! Ми можемо очікувати, що DeepL надішле нам переклад, тепер нам потрібно сказати Blackbird взяти цей переклад і надіслати його в наше повідомлення Slack.

Ми робимо це, повертаючись до нашої дії Send message, натиснувши на неї. Ви бачите, що повідомлення, яке ми надсилаємо, все ще є повідомленням, яке ми раніше ввели. Пам'ятаєте значок чарівної палички? Давайте використаємо його зараз!

Натисніть на чарівну паличку перед полем _Message_. Поле введення тепер змінюється на випадний список. Натисніть на випадний список, і вам буде представлена інформація, яка повертається з DeepL.

![Slack DeepL input](~/assets/guides/beginner-bird/slack_deepl_input.png)

Ви можете помітити, що Blackbird також попереджає вас, що ваш робочий процес неповний. Давайте швидко натиснемо на **Translated text**, оскільки це інформація, яку ми хочемо надіслати з DeepL до Slack. Після того, як ви це зробили, все повинно виглядати добре, і настав час знову натиснути кнопку **Fly**!

![Result Spanish](~/assets/guides/beginner-bird/result_spanish.png)

🥳 ¡Felicidades! Ви щойно створили bird, який демонструє найважливіший аспект Blackbird: взяття інформації з одного додатка та передача її іншому. Не соромтеся натиснути на _Show Flights_ знову, щоб побачити всю інформацію про політ. Після цього ви готові вийти на новий рівень?

## Крок 3: Відповідь на повідомлення

Досі ми запускали цей bird, натискаючи кнопку **Fly**. Чи не було б набагато веселіше, якби цей bird насправді запускався на повідомлення, які надсилаються в Slack?
Настав час змінити цей ручний тригер. Ми хочемо досягти того, щоб якщо хтось надсилає повідомлення на канал, позначаючи _@Blackbird_, цей bird полетить і перекладе повідомлення для вас