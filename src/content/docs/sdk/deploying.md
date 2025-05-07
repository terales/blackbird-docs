---
title: Deploying Your App
description: Learn how to deploy a Blackbird app.
sidebar:
  label: Deploying Your App
  order: 2
---

Blackbird apps that you create using the SDK can be deployed to your Blackbird organization as a _custom app_. This tutorial assumes Visual Studio 2022.

> **Note:** If you are forking a public app to create a custom app, make sure to update the `Product`, `PackageId`, and `AssemblyName` fields in the app's `.csproj` file. Blackbird requires every custom app to have unique system-wide identifiers.

## Publishing

Before deploying an app, make sure that it at least contains a class that implements `IApplication` (and optionally `ICategoryProvider` ), a class that implements `IConnectionDefinition` and a class that implements `IConnectionValidator`. If your app has actions, then make sure your classes implementing actions have the `[ActionList]` attribute. If you have events make sure that your event classes have the `[WebhookList]` or `[PollingEventList]` attribute.

1. Right-click on your project in the solution explorer and click _Publish_

![connection](~/assets/docs/publishing.png)

2. If you have not created a publish profile yet, create a publish profile that publishes to a local folder.
3. Click _Publish_ and then _Open folder_
4. Create a `.zip` archive including **all** files in this folder

> **Note: If you are working on a Mac, make sure to delete the hidden _\_MACOSX_ folder in the zip archive before uploading it to Blackbird.**

![zipping](~/assets/docs/zipping.png)

* Size limitation: plugin builds must be **under 16MB**. Builds up to **15MB inclusive** are accepted. If the build exceeds 16MB, the platform will reject it.
* The `.csproj` file may include the `<EnableDynamicLoading>true</EnableDynamicLoading>` parameter, which increases the build size. Use it only if the final `.zip` file remains under 16MB. If the build exceeds the limit, set this value to `false`.
* Example:

```xml
<EnableDynamicLoading>false</EnableDynamicLoading>
```

### Building via CLI

* Plugins can be built not only via Visual Studio, but also using the command line with `dotnet build`.

* Use the `Release` configuration to minimize the build size.

* Do **not** specify the `--runtime` parameter, as Blackbird requires a Portable Runtime. Just omit this parameter entirely.

* Example command:

```bash
dotnet build [path to .csproj file] --configuration Release
```

* Concrete example:

```bash
dotnet build Apps.Contentful/Apps.Contentful.csproj --configuration Release
```

## Uploading

If you want to create a new app, go to _Apps_ -> _My custom apps_ -> Click on _Create app_. Upload the `.zip` file on the second step.

If you want to update an existing app. On the app you want to update click _New version_ and then _Update App_. Upload the `.zip` file to the screen that pops up and click _Update_.

> Note: When updating an app, make sure that the new version of the app (defined in the `.csproj` file) is higher than the existing version.

![zipping](~/assets/docs/upload.png)
