---
title: Blackbird App
description: Egg з потенціалом створення моніторингових Birds для відстеження всього, що відбувається у вашому екземплярі Blackbird
sidebar:
  label: Blackbird app
  order: 5
  hidden: false
---

## Eggs: Відправні точки для ваших Birds

У Blackbird, Eggs є насінням або кресленнями для ваших робочих процесів. Вони представляють початкові ідеї, які мають потенціал перетворитися на повноцінні Birds.

У цьому посібнику з Egg розглянемо деякі варіанти моніторингу та отримання сповіщень щоразу, коли щось відбувається у вашому екземплярі Blackbird централізованим способом. Знайдіть **Завантажувані Eggs** після кожного випадку використання.

## Будьте в курсі з додатком Blackbird

З великою кількістю Nests, Birds, користувачів та Flights у дії легко втратити слід за зграєю. Blackbird був розроблений для тихої роботи у фоновому режимі, автоматизуючи ваші робочі процеси без необхідності постійних перевірок. Але що відбувається, коли Bird призупиняється, користувач приєднується до Nest або залишає його, або Flight зазнає невдачі? Ось де стає у нагоді додаток Blackbird! Вважайте його своєю надійною сторожовою вежею, яка стежить за всією активністю у вашому екземплярі Blackbird. Чи то запис оновлень у таблиці, чи надсилання сповіщень безпосередньо в Slack, Teams або Outlook, додаток Blackbird гарантує, що ви ніколи не пропустите жодного моменту — або твіту.

## Випадки використання

### Сповіщення про помилки або їх відстеження

Найпопулярнішим випадком використання додатку Blackbird у Blackbird є моніторинг невдалих Flights. Ви можете отримувати сповіщення в реальному часі, які містять ключові деталі, такі як повідомлення про помилку, назву Nest, назву Bird, ідентифікатор Flight та дату початку. Крім того, ви можете записувати ці невдалі Flights у таблицю для подальшого перегляду або для наповнення інформаційних панелей.

> Використовуйте додаткові вхідні дані для моніторингу конкретного Nest, інакше один Bird буде відстежувати всі Nests у вашому екземплярі Blackbird.

![Egg](../../../../assets/docs/eggs/BBApp1.png)
Bird ескалації помилок

- Завантажити Egg: <a href="https://docs.blackbird.io/downloads/Report_failed_Flights_on_Slack.json" download>Звітувати про невдалі Flights у Slack</a>
- Завантажити Egg: <a href="https://docs.blackbird.io/downloads/Report_failed_Flights_on_Teams.json" download>Звітувати про невдалі Flights у Teams</a>
- Завантажити Egg: <a href="https://docs.blackbird.io/downloads/Report_failed_Flights_via_Outlook_email.json" download>Звітувати про невдалі Flights через Outlook email</a>
- Завантажити Egg: <a href="https://docs.blackbird.io/downloads/Report_failed_Flights_via_Gmail.json" download>Звітувати про невдалі Flights через Gmail</a>

![Egg](../../../../assets/docs/eggs/BBApp2.png)
Bird для логування помилок

- Завантажити Egg: <a href="https://docs.blackbird.io/downloads/Log_failed_Flights_on_Google_Sheets.json" download>Логувати невдалі Flights у Google Sheets</a>
- Завантажити Egg: <a href="https://docs.blackbird.io/downloads/Log_failed_Flights_on_Microsoft_Excel.json" download>Логувати невдалі Flights у Microsoft Excel</a>

### Додані або видалені користувачі

Моніторинг користувачів, доданих або видалених з конкретного Nest.

![Egg](../../../../assets/docs/eggs/BBApp3.png)

- Завантажити Egg: <a href="https://docs.blackbird.io/downloads/On_user_removed_send_Slack_message.json" download>При видаленні користувача надіслати повідомлення в Slack</a>

### Birds призупинені або активовані

Отримуйте сповіщення, коли Birds призупиняються або активуються: отримуйте сповіщення в реальному часі про зміни у вашому Production Nest.

![Egg](../../../../assets/docs/eggs/BBApp4.png)

> Використовуйте додаткові вхідні дані для моніторингу конкретного Nest, інакше один Bird буде відстежувати всі Nests у вашому екземплярі Blackbird.

- Завантажити Egg: <a href="https://docs.blackbird.io/downloads/On_Bird_activated_send_Slack_message.json" download>При активації Bird надіслати повідомлення в Slack</a>

## Імпорт Eggs

Щоб імпортувати Egg у ваш Nest:

1. Перейдіть до розділу Bird Editor.
2. Натисніть Імпорт у верхньому правому куті.
3. Виберіть файл Egg (JSON) для імпорту та натисніть `Import`.
4. Знайдіть новостворений Bird і натисніть на нього для редагування.
5. Додайте дані Connection та будь-які інші необхідні вхідні параметри або бажані кроки. Зверніть увагу на червоні знаки попередження поруч з назвою кроку, які сигналізують про відсутність деталей у цьому кроці.
6. Натисніть на три крапки поруч із назвою Bird і оновіть додатки, якщо доступні оновлення.
7. Натисніть Зберегти/Опублікувати.

![Імпорт Eggs](../../../../assets/docs/eggs/ImportEggs.gif)