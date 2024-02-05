---
title: Files
description: Learn how to deal with (large) files in Blackbird.
sidebar:
  label: Files
  order: 7
---

In content operations we usually handle files that have to be transported out of one system, into another. The problem with most workflow orchestrators is that they put a hard limit on the size these files can have. For a lot of localization purposes these limits are too strict. That's why at Blackbird we have created a system that enables you to handle files without limits \*\*!

> \*\* Technically the limits are still there, but they are mainly enforced by the apps that you are connecting to. The limit of a file in a bird is thus determined by the lowest limit of any app it passes through. Blackbird itself should never be the bottleneck!

At the core, Blackbird files are _references_ to files. Because different APIs tend to handle files differently, we created two distinct methods which you can use to pass along files or process them. This means that in an action, you are able to define `FileReference`s as part of input and output values. But inside the action you can decide if you want to only retrieve a download URL to a file or if you want to download the file bytes as a stream into memory. This allows Blackbird actions that process files to be very efficient!

## Creating a file reference from a URL

Let's look at the first scenario, where we are creating a file reference. As its first argument, we can pass an `HttpRequestMessage` that would, when executed, download a file.

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

When this action is executed, the Blackbird core now picks up on the fact that a new file reference has been created from an `HttpRequestMessage`. It will now download this file and put it in an internal storage.

> Note: all files are permanently deleted when a flight finishes.

The file reference class has a URL property, this can be used in any app you connect to that can take a file URL instead of raw bytes.

## Creating a file reference from file content

Sometimes, the app you want to connect to doesn't expose its files through a URL but through some other method. Or, you actually want to process the file content before passing it to Blackbird.
In this case you can also create a file reference from a memory stream like so:

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

As you can see, when we want to manipulate file bytes, we now need to use the `IFileManagementClient` which is injected into any class if it asks for it.
The `fileManagementClient` is a bridge between your app and the Blackbird core system. It allows you to upload raw bytes into a file in order to retrieve a file reference. This reference can then be returned.

## Uploading a file reference from raw content

You can use the `DownloadAsync` method on the `fileManagementClient` in order to turn any file reference into a file stream. You can then use this stream in your API methods at will.

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
