---
locale: hu
title: Files
description: Ismerje meg, hogyan kezelje a (nagy) fájlokat a Blackbird rendszerben.
sidebar:
  label: Files
  order: 7
---

A tartalmi műveletek során általában olyan fájlokat kezelünk, amelyeket egyik rendszerből ki kell venni és egy másikba át kell helyezni. A legtöbb munkafolyamat-vezérlő rendszer problémája, hogy kemény korlátot szab e fájlok méretére. Sok lokalizációs cél esetében ezek a korlátok túl szigorúak. Ezért a Blackbird-nél olyan rendszert hoztunk létre, amely lehetővé teszi a korlátok nélküli fájlkezelést \*\*!

> \*\* Technikailag a korlátok még mindig léteznek, de ezeket főként azok az alkalmazások szabják meg, amelyekhez csatlakozik. Egy bird-ben lévő fájl korlátját így az ezen keresztül haladó alkalmazások legalacsonyabb korlátja határozza meg. A Blackbird maga soha nem lehet a szűk keresztmetszet!

Alapvetően a Blackbird fájlok _hivatkozások_ a fájlokra. Mivel a különböző API-k hajlamosak eltérően kezelni a fájlokat, két különböző módszert hoztunk létre, amelyeket a fájlok továbbítására vagy feldolgozására használhat. Ez azt jelenti, hogy egy műveletben meghatározhat `FileReference`-eket bemeneti és kimeneti értékek részeként. De a műveletben belül eldöntheti, hogy csak egy letöltési URL-t szeretne-e lekérni a fájlhoz, vagy a fájl bájtjait szeretné-e stream-ként letölteni a memóriába. Ez lehetővé teszi, hogy a fájlokat feldolgozó Blackbird műveletek nagyon hatékonyak legyenek!

## Fájlhivatkozás létrehozása URL-ből

Nézzük meg az első forgatókönyvet, ahol fájlhivatkozást hozunk létre. Első argumentumként átadhatunk egy `HttpRequestMessage`-et, amely végrehajtása esetén letöltene egy fájlt.

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

Amikor ezt a műveletet végrehajtják, a Blackbird core felismeri, hogy egy új fájlhivatkozás jött létre egy `HttpRequestMessage`-ből. Ezután letölti ezt a fájlt, és belső tárolóba helyezi.

> Megjegyzés: minden fájl véglegesen törlődik, amikor egy flight befejeződik.

A file reference osztálynak van egy URL tulajdonsága, ezt bármely csatlakoztatott alkalmazásban használhatja, amely képes fájl URL-t fogadni a nyers bájtok helyett.

## Fájlhivatkozás létrehozása fájltartalomból

Néha az alkalmazás, amelyhez csatlakozni szeretne, nem URL-en keresztül teszi elérhetővé a fájljait, hanem valamilyen más módszerrel. Vagy ténylegesen fel szeretné dolgozni a fájl tartalmát, mielőtt továbbítaná a Blackbird-nek.
Ebben az esetben létrehozhat fájlhivatkozást memória stream-ből is a következőképpen:

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

Mint látható, amikor fájlbájtokat szeretnénk manipulálni, akkor az `IFileManagementClient`-re van szükségünk, amely bármely osztályba injektálható, ha kéri azt.
A `fileManagementClient` híd az alkalmazás és a Blackbird alaprendszer között. Lehetővé teszi nyers bájtok feltöltését fájlba, hogy fájlhivatkozást kapjunk. Ezt a hivatkozást aztán visszaadhatjuk.

## Fájlhivatkozás feltöltése nyers tartalomból

A `fileManagementClient` `DownloadAsync` metódusának segítségével bármely fájlhivatkozást fájlstreammé alakíthat. Ezt a streamet aztán tetszés szerint használhatja az API-metódusaiban.

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