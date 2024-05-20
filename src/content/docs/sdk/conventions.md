---
title: App conventions
description: Use the knowledge that we aquired with building over a 100 apps and integrations.
sidebar:
  label: App conventions
  order: 8
  hidden: true
---

As you know, Blackbird apps can be viewed as mini products where each event, action and dropdown delivers a deliberate user experience with the goal of building workflows in the easiest way possible. We have been building more than a 100 apps and integrations and during this time we have learned what standards and conventions should be adhered to to deliver an easy and consistent user experience. The conventions you will find below are applied to all Blackbird public apps (where possible) and can be an invaluable resource for you when building your own apps.

## 1. Types

In Blackbird, users can encounter the following 5 basic types: text (string), number (any numeric type in .NET), dates [(`DateTime`)](https://learn.microsoft.com/en-us/dotnet/api/system.datetime?view=net-8.0), files [(`FileReference`)](/sdk/files) and booleans. Then the user can also find 'multiple' versions of the aforementioned which are denoted as `IEnumerable<string>`, `IEnumerable<FileReference>`, etc. in the SDK.

### 1.1 - ID types

Some apps treat IDs as integers, some as longs, some as strings. **In Blackbird we treat all ID-like variables as strings**. This means that any variable that is an identifier of some sort, should be converted to and from a string. Reason being is that if we have some apps that treat IDs as numbers, and some as strings, we cannot provide interoperability in terms of saving IDs in other places. F.e. if you want to save an ID in a custom field, you generally can only save string types. Therefore, pulling a value from that custom field would not be interoperable with a numeric ID input. Secondly, nobody should be performing arithmetic operations on IDs.

> ⚠️ Be aware - [System.Text.Json (default RestSharp deserializer)](https://learn.microsoft.com/en-us/dotnet/standard/serialization/system-text-json/migrate-from-newtonsoft?pivots=dotnet-6-0#non-string-values-for-string-properties) does not deserialize from int, float, etc. to string by default.

### 1.2 - Date types

Dates are used in many applications. However, no application is consistent in the format they use to represent dates. **In Blackbird, everything that represents a date should be converted to [`DateTime`](https://learn.microsoft.com/en-us/dotnet/api/system.datetime?view=net-8.0)**. Whether it's a 'created at' field or a deadline. Make sure that your dates are DateTimes and not strings or longs. It's the only way to make applications interoperable.

## 2. Naming

**All authentication credentials, actions, (webhook) events, input parameters and output parameters should have a user-friendly, descriptive short name.** If the descriptive name is insufficient then a longer description can be added which will appear as a popover in the Blackbird UI.

> **💡 Tip**: You can use the [Display()] attribute on almost anything to give it a name and optional description.

All names that are exposed to users in the UI should be carefully chosen, reflect the action/event/parameter perfectly and could use the description to describe any important additional information. All naming conventions apply to action names, action descriptions, property display names, data sources and connection properties.

### 2.1 - Capitalization

**The first word of every name should be capitalized. No other words should be capitalized**. E.g.

> ❌ Create Draft Message

> ✅ Create draft message

Except for abbreviations. **All abbreviations should be fully uppercase**. So ID and not Id, URI and not uri.

> ❌ Project id

> ✅ Project ID

### 2.2 - IDs

For a period of time we ommited the word "ID" from input/output variables that were actually ID parameters in favor of just calling it what it was: Project, Translation, Task. This was a mistake. It is unclear to the user what parameter represents and was often mistaken for f.e. translation content. **Any variable that is an ID should have the word ID in it**. Also, **never name a parameter just “ID”, always be more explicit** e.g. “Company ID”.

> ❌ ID

> ❌ Translation

> ✅ Translation ID

### 2.3 - Name lengths

Names in the bird editor don’t have too much space to work with. That’s why **property and action names need to be relatively concise**. As a rule of thumb, names should be **no more than ~40 characters**.

> ❌ Add business phone number to contact's business details

> ✅ Update contact

## 3. Errors

## 4. Connections

## 5. Variables

## 6. Data sources

## 7. Actions

## 8. Events

### 8.1 Event names

**Events should follow the "On ..." pattern** and preferable the "On \<noun> \<verb>" pattern to always accuratly and concisely clarify when the event takes place. E.g.

- On project imported
- On team order deleted

## 9. Files

## 10. Rest connections
