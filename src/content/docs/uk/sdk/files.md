---
locale: uk
title: Files
description: Дізнайтеся, як працювати з (великими) файлами у Blackbird.
sidebar:
  label: Files
  order: 7
---

В операціях з контентом ми зазвичай маємо справу з файлами, які потрібно передавати з однієї системи в іншу. Проблема з більшістю оркестраторів робочих процесів полягає в тому, що вони встановлюють жорсткі обмеження на розмір цих файлів. Для багатьох цілей локалізації ці обмеження занадто суворі. Тому в Blackbird ми створили систему, яка дозволяє працювати з файлами без обмежень \*\*!

> \*\* Технічно обмеження все ще існують, але вони в основному встановлюються додатками, які ви з'єднуєте. Таким чином, обмеження файлу в потоці (bird) визначається найнижчим обмеженням будь-якого додатка, через який він проходить. Blackbird сам по собі ніколи не повинен бути вузьким місцем!

По суті, файли Blackbird — це _посилання_ на файли. Оскільки різні API зазвичай обробляють файли по-різному, ми створили два окремі методи, які можна використовувати для передачі файлів або їх обробки. Це означає, що в дії ви можете визначати `FileReference` як частину вхідних і вихідних значень. Але всередині дії ви можете вирішити, чи хочете отримати лише URL-адресу для завантаження файлу, чи завантажити байти файлу як потік у пам'ять. Це дозволяє діям Blackbird, які обробляють файли, бути дуже ефективними!

## Створення посилання на файл з URL

Розглянемо перший сценарій, де ми створюємо посилання на файл. Як перший аргумент, ми можемо передати `HttpRequestMessage`, який при виконанні завантажить файл.

```cs
[Action("Download file by URL", Description = "Download specific file by URL")]
public Task<FileResponse> DownloadFileByUrl([ActionParameter] DownloadFileRequest input)
{
    // Creating file instance that will be asynchronously downloaded by Blackbird
    var file = new FileReference(new HttpRequestMessage(HttpMethod.Get, input.FileUrl), input.FileName,
        MediaTypeNames.Application.Octet);

    return Task.FromResult<FileResponse>(new(file));
}
```

Коли ця дія виконується, ядро Blackbird розпізнає, що було створено нове посилання на файл з `HttpRequestMessage`. Воно завантажить цей файл і помістить його у внутрішнє сховище.

> Примітка: всі файли остаточно видаляються після завершення виконання потоку.

Клас посилання на файл має властивість URL, яку можна використовувати в будь-якому додатку, який ви підключаєте і який може приймати URL-адресу файлу замість необроблених байтів.

## Створення посилання на файл із вмісту файлу

Іноді додаток, до якого ви хочете підключитися, не надає доступ до своїх файлів через URL, а через інший метод. Або ви фактично хочете обробити вміст файлу перед передачею його в Blackbird.
У цьому випадку ви також можете створити посилання на файл з потоку пам'яті таким чином:

```cs
public class FilesActions : AppInvocable
{
    // Injecting instance of IFileManagementClient that helps to work with files inside of Blackbird
    private readonly IFileManagementClient _fileManagementClient;

    protected FilesActions(InvocationContext invocationContext, IFileManagementClient fileManagementClient) : base(
        invocationContext)
    {
        _fileManagementClient = fileManagementClient;
    }

    [Action("Download file", Description = "Download specific file")]
    public async Task<FileResponse> DownloadFile([ActionParameter] DownloadFileRequest input)
    {
        var request = new RestRequest(input.FileUrl);
        var response = await Client.ExecuteAsync(request);

        // Throwing error if status code is not successful
        if (!response.IsSuccessStatusCode)
            throw new($"Could not download your file; Code: {response.StatusCode}");

        // Uploading downloaded file to Blackbird
        var file = await _fileManagementClient.UploadAsync(new MemoryStream(response.RawBytes!), response.ContentType!,
            input.FileName);

        // file is of type FileReference, and can be added to any output class
        return new(file);
    }
}
```

Як бачите, коли ми хочемо маніпулювати байтами файлу, нам потрібно використовувати `IFileManagementClient`, який вводиться в будь-який клас, якщо він його запитує.
`fileManagementClient` є містком між вашим додатком і основною системою Blackbird. Він дозволяє завантажувати необроблені байти у файл для отримання посилання на файл. Потім це посилання можна повернути.

## Завантаження посилання на файл з необробленого вмісту

Ви можете використовувати метод `DownloadAsync` на `fileManagementClient`, щоб перетворити будь-яке посилання на файл у потік файлу. Потім ви можете використовувати цей потік у ваших методах API за бажанням.

```cs
[Action("Upload file", Description = "Upload specific file")]
public async Task UploadFile([ActionParameter] UploadFileRequest input)
{
    // Downloading input file from Blackbird into a stream
    var fileStream = await _fileManagementClient.DownloadAsync(input.File);

    var request = new RestRequest(input.UploadUrl, Method.Post)
        .AddFile("file", () => fileStream, input.File.Name);
    var response = await Client.ExecuteAsync(request);

    // Throwing error if status code is not successful
    if (!response.IsSuccessStatusCode)
        throw new($"Could not upload your file; Code: {response.StatusCode}");
}
```