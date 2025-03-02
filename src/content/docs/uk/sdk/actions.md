---
title: Defining Actions
description: Дізнайтеся, як визначати дії в проекті Blackbird.
sidebar:
  label: Actions
  order: 4
---

Ви можете використовувати SDK для визначення дій, які повинні відображатися у вашому додатку. На відміну від інших платформ оркестрації робочих процесів, дії в Blackbird не обов'язково мають відповідність 1:1 з кінцевою точкою. Часто ми адаптуємо дію, щоб зробити її більш зручною для користувача та/або додаємо додаткові функції для зручності.

## Вказання Blackbird на дії

Дії в проекті Blackbird визначаються як методи в класі, який має атрибут `ActionList`. Ці методи повинні мати атрибут `Action`. Базова структура дії виглядає так:

```cs
// Щоб бути видимим для Blackbird, додайте атрибут [ActionList]
[ActionList]
public class MyActions : BaseInvocable
{
  // [...]

  // Усі методи в цьому класі з атрибутом [Action] будуть видимі як дії в Blackbird
  [Action("Translate", Description = "Translate a string")]
  public async Task<TextResult> Translate([ActionParameter] TextTranslationRequest request)
  {
    // Do something here with the request

    return new TextResult{ Translation = "My translation" }
  }
}
```

Аргументи методів, які використовують атрибути `ActionParameter`, є вхідними даними дії в редакторі Bird. Якщо дія не має вхідних параметрів, аргумент може бути відсутнім.

Атрибут `Action` буде приймати рядок як перший аргумент. Це буде відображуване ім'я дії в Blackbird. Ви також можете вказати необов'язковий аргумент Description, який відображається в Blackbird.

Поля у вихідному класі будуть автоматично доступні в редакторі Bird на наступних кроках. Методи дій можуть бути асинхронними, але це не є обов'язковою вимогою.

> Примітка: Ім'я вашого методу дії не можна змінювати, Blackbird буде інтерпретувати це як видалену і новостворену дію.

## Визначення відображуваних імен для вхідних значень

Атрибут `[ActionParameter]` можна додати до будь-якого прийнятного аргументу (рядки, числа, логічні значення, дати, списки), а також до класів. Коли він додається до класу, Blackbird просто відображатиме всі властивості цього класу як вхідні аргументи.

Атрибут `[Display]` можна використовувати як для властивостей класу, так і для вхідних аргументів, щоб визначити, як змінна повинна називатися в інтерфейсі Blackbird. Крім того, також можна додати опис.

```cs
public class GetBerryRequest
{
    // Властивості повинні мати атрибути display, які містять зручне для користувача ім'я змінної
    [Display("Berry name", Description = "The name of the berry")]
    public string BerryName { get; set; }
}
```

Цей клас трансформується в:

![connection](~/assets/docs/berry.png)

Так само, як із вхідними аргументами, атрибут `[Display]` також працює з типами повернення ваших дій, щоб надати їм зручні для користувача імена.

### Ігнорування атрибутів

Ви можете використовувати атрибут `[DefinitionIgnore]`, щоб приховати властивість від відображення в Blackbird.

```cs
public class BerryResponse
{
    [Display("Berry ID", Description = "The ID of the berry")]
    public string Id { get; set; }

    [Display("Berry name", Description = "The name of the berry")]
    public string Name { get; set; }

    [DefinitionIgnore]
    public string InternalReference { get; set; }
}
```

## Необов'язкові вхідні дані

За замовчуванням всі вхідні параметри є обов'язковими в інтерфейсі Blackbird. Ви можете позначити будь-який вхідний параметр як необов'язковий, просто зробивши значення допустимим для нульового значення (`?` в C#).

```cs
public class CreateCallbackRequest
{
    // Цей вхідний параметр тепер необов'язковий
    [Display("Action")] public string? Action { get; set; }
    [Display("Callback URL")] public string CallbackUrl { get; set; }
}
```

## Використання вашого з'єднання

Тепер, коли ми знаємо, як визначати власний код, який виконується при виклику дії, давайте також використаємо з'єднання, яке ми раніше визначили.
У Blackbird будь-який клас може успадковувати від `BaseInvocable`. Коли це зроблено, Blackbird передає контекст виклику цьому класу при його створенні. Контекст включає корисну інформацію, таку як ID Bird, ID Flight, але найголовніше: облікові дані для аутентифікації.

```cs
[ActionList]
public class MyActions : BaseInvocable
{
  // Створіть конструктор, який передає InvocationContext
  public MyActions(InvocationContext invocationContext) : base(invocationContext) {}

  [Action("Translate", Description = "Translate a string")]
  public async Task<TextResult> Translate([ActionParameter] TextTranslationRequest request)
  {
    var credentials = InvocationContext.AuthenticationCredentialsProviders;

    // Use the crednetials to make an API request

    return new TextResult{ Translation = "My translation" }
  }
}
```