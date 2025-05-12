---
title: Understanding Apps in Blackbird
description: Learn what Apps are
sidebar:
  label: Apps
  order: 2
---

A Blackbird App connects an application to the vast Blackbird ecosystem using its API. An App consists of events and/or actions that allow the user to orchestrate workflows. You can manage and set up _Apps_ in the Apps screen of Blackbird.io.

## Browsing Apps

Blackbird is rolling out the red carpet with a constant stream of Public Apps. If we don’t have an app pre-built, you can build it yourself - using Blackbird's SDK.

1. On the top navigation bar, click _Apps_.
2. Click on an App to view or edit its details.

| Tab             | Description                                                                                                             |
| --------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Connections     | Connections are the wiring of apps. Birds authorize their interactions with other apps or services through connections. |
| Events          | Things can happen inside the app you're conencted to. We call this an event. Events trigger your Birds when to fly.     |
| Actions         | Actions are tasks that birds will perform once a trigger activates them.                                                |
| Version history | This tab lists the version history of the App.                                                                          |

![connection](https://d33v4339jhl8k0.cloudfront.net/docs/assets/64089f6dc6ff3e6ff7fa7c9b/images/646cb12c55262c1c47d0953c/file-3dtYY1F4Nf.gif)

## The Blackbird App way

Blackbird apps are more than just API wrappers. Each app is thoughtfully designed to make automation not only powerful, but also user-friendly and highly interoperable. Rather than exposing raw API calls, we abstract away complexity and enhance functionality so users can focus on what they want to achieve, not how to achieve it.

This approach shows up clearly in the following examples:
- if an external system requires multiple API calls to export a file, poll for its readiness, and then download it, Blackbird compresses this into a single, seamless `Download a file` action. 
- Similarly, we've enriched our LLM integrations with a variety of pre-engineered prompts to help users get reliable results with minimal setup. 
- When content is pulled from CMS platforms, we ensure it's in a format that's compatible with popular TMS or MT systems, minimizing friction in multilingual workflows. 
- We also normalize workflows involving glossaries or term bases. Regardless of how each app exports or imports this type of data, Blackbird handles the necessary format transformations behind the scenes so everything just works.