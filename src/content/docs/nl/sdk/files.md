---
title: Files
description: Leer hoe je met (grote) bestanden in Blackbird kunt werken.
sidebar:
  label: Files
  order: 7
---

In content operaties werken we meestal met bestanden die van het ene systeem naar het andere moeten worden overgebracht. Het probleem met de meeste workflow-tools is dat ze een strikte limiet stellen aan de grootte van deze bestanden. Voor veel lokalisatiedoeleinden zijn deze limieten te streng. Daarom hebben we bij Blackbird een systeem ontwikkeld waarmee je bestanden zonder beperkingen kunt verwerken \*\*!

> \*\* Technisch gezien zijn er nog steeds limieten, maar deze worden voornamelijk opgelegd door de apps waarmee je verbinding maakt. De limiet van een bestand in een bird wordt dus bepaald door de laagste limiet van elke app waar het doorheen gaat. Blackbird zelf zou nooit de beperkende factor moeten zijn!

In de kern zijn Blackbird-bestanden _verwijzingen_ naar bestanden. Omdat verschillende API's bestanden op verschillende manieren verwerken, hebben we twee verschillende methoden gecreëerd die je kunt gebruiken om bestanden door te geven of te verwerken. Dit betekent dat je in een actie `FileReference`s kunt definiëren als onderdeel van invoer- en uitvoerwaarden. Maar binnen de actie kun je beslissen of je alleen een download-URL naar een bestand wilt ophalen of dat je de bestandsbytes als stream in het geheugen wilt downloaden. Dit zorgt ervoor dat Blackbird-acties die bestanden verwerken zeer efficiënt kunnen zijn!

## Een bestandsreferentie maken van een URL

Laten we kijken naar het eerste scenario, waarin we een bestandsreferentie maken. Als eerste argument kunnen we een `HttpRequestMessage` doorgeven die, wanneer uitgevoerd, een bestand zou downloaden.

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

Wanneer deze actie wordt uitgevoerd, constateert de Blackbird-kern dat er een nieuwe bestandsreferentie is gemaakt van een `HttpRequestMessage`. Het zal nu dit bestand downloaden en in een interne opslag plaatsen.

> Opmerking: alle bestanden worden permanent verwijderd wanneer een flight eindigt.

De bestandsreferentieklasse heeft een URL-eigenschap, deze kan worden gebruikt in elke app waarmee je verbinding maakt die een bestands-URL kan verwerken in plaats van ruwe bytes.

## Een bestandsreferentie maken van bestandsinhoud

Soms stelt de app waarmee je verbinding wilt maken zijn bestanden niet beschikbaar via een URL, maar via een andere methode. Of je wilt de bestandsinhoud verwerken voordat je deze aan Blackbird doorgeeft.
In dit geval kun je ook een bestandsreferentie maken van een geheugenstream als volgt:

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

Zoals je kunt zien, wanneer we bestandsbytes willen manipuleren, moeten we nu de `IFileManagementClient` gebruiken die in elke klasse wordt geïnjecteerd als deze erom vraagt.
De `fileManagementClient` is een brug tussen je app en het Blackbird-kernsysteem. Hiermee kun je ruwe bytes naar een bestand uploaden om een bestandsreferentie te verkrijgen. Deze referentie kan dan worden teruggegeven.

## Een bestandsreferentie uploaden vanuit ruwe inhoud

Je kunt de methode `DownloadAsync` op de `fileManagementClient` gebruiken om elke bestandsreferentie om te zetten in een bestandsstream. Je kunt deze stream vervolgens naar wens gebruiken in je API-methoden.

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