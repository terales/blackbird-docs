---
title: Birds
description: Learn what Birds are
sidebar:
  label: Birds
  order: 1
---

## What is a Bird?

In Blackbird, a `Bird` refers to an automated **workflow**, designed to streamline tasks by connecting various applications seamlessly. Blackbird users design Birds to perform specific sequences of operations automatically — saving time, reducing manual work, and ensuring consistency across processes.

Each Bird starts with a [trigger](https://docs.blackbird.io/concepts/triggers/), an event that kicks off the workflow. This is followed by one or more **actions**, which interact with the [apps](https://docs.blackbird.io/concepts/apps/) available in the Blackbird ecosystem. The output of one action can be passed to subsequent actions, creating a dynamic chain of automated steps.

Birds are built and configured in the `Bird Editor` tab.

![Bird editor tab](~/assets/docs/bird-editor.gif)

Birds can be renamed, exported/[imported](https://docs.blackbird.io/eggs/storage-to-mt/#importing-eggs), copied to other [Nests](https://docs.blackbird.io/concepts/nests/), or cloned to test variations.

![Bird options](~/assets/docs/bird-options.gif)

A Bird can include:

+ An initial [**trigger**](https://docs.blackbird.io/concepts/triggers/)
+ One or more **actions**
+ [**Checkpoints**](https://docs.blackbird.io/concepts/checkpoints/) to pause a process
+ **Decision** points to control the workflow path
+ [**Loops**](https://docs.blackbird.io/guides/loops/) for repeated actions
+ **Operators** for logic and transformations

Once a Bird has taken off, it creates [**Flights**](https://docs.blackbird.io/concepts/flights/) — executions of the workflow.

> Mastering Birds is the key to unlocking the full power of Blackbird.


