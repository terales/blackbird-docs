---
title: Setting up a Blackbird project from scratch
description: Learn how to create a Blackbird project using the Blackbird SDK.
sidebar:
  label: Manual Setup
  order: 1
---

Use your favorite IDE to create a .NET class library to start your project. Then, install our SDK using NuGet. You can find a link to our SDK [here](https://www.nuget.org/packages/Blackbird.Applications.Sdk.Common) or search 'Blackbird' in the NuGet package manager. This guide shows you the steps in Visual Studio 2022 for Windows.

## Prerequisites

- Install Visual Studio 2022 for Windows with the .NET desktop development workload. You can [download](https://visualstudio.microsoft.com/) and install the 2022 Community edition for free, or use the Professional or Enterprise edition.

## Create a project

1. In Visual Studio, select _File > New > Project_.
2. In the _Create a new project_ window, enter _Class Library_ in the search box and select _C#_ and in the dropdown lists. In the resulting list of project templates, select _Class Library_ and then select _Next_.
3. In the _Configure your new project_ window, update the _Project name_ and the _Solution name_, and then select _Next_.
4. Select .NET 6.0 (or the latest version) for _Framework_ in the _Additional information window_, then select _Create_.

Visual Studio creates the project, and it appears in the Solution Explorer.

## Adding the SDK

Depending on your project format, the installation of a NuGet package records the dependency in either your project file or a _packages.config_ file. For more information, see Package consumption workflow.

### NuGet Package Manager

To use the NuGet Package Manager to install the `Blackbird.Applications.Sdk.Common` package in Visual Studio, follow these steps:

1. Select _Project > Manage NuGet Packages_.
2. On the _NuGet Package Manager_ page, choose _nuget.org_ as the _Package source_.
3. From the _Browse_ tab, search for _Blackbird.Applications.Sdk.Common_, select `Blackbird.Applications.Sdk.Common` in the list, and then select _Install_.
4. When you are prompted to verify the installation, select _OK_.

![nuget](../../../assets/docs/nuget.png)
