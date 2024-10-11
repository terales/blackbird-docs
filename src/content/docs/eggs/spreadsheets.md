---
title: Common spreadsheet use cases
description: Let's deep dive into common use cases around spreadsheets
sidebar:
  label: Spreadsheets
  order: 4
  hidden: true
---

### Eggs: Starting Points for Your Birds

In Blackbird, Eggs are the seeds or blueprints for your workflows. They represent the initial ideas that have the potential to become fully-fledged Birds.

In this Egg-guide, let's explore some common use case around spreadsheets using [Google Sheets](https://docs.blackbird.io/apps/google-sheets/), [Microsoft Excel](https://docs.blackbird.io/apps/microsoft-excel/) or [Airtable](https://docs.blackbird.io/apps/airtable/). Find **Downloadable Eggs** under each use case - download JSON workflows to [import into your Nest](https://docs.blackbird.io/eggs/spreadsheets/#importing-eggs), add your connections, make any desired adjustments, and **fly**.

## Use cases

### Logging and Reporting

Spreadsheets can be a powerful tool to capture key data points at various stages of a workflow. Not only to be used as internal logs, but also sending workflow information to an external spreadsheet offers enhanced visibility and potential integration with dashboard tools for real-time analytics.

The `Add new sheet row` action in Blackbird is ideal for this purpose. It appends a new row at the end of the spreadsheet's used range and allows multiple data points to be passed into consecutive cells, maintaining the order you specify in Blackbird. It will also check if there are rows available (Google Sheets) and add one in case we are at the spreadsheet's end.

![Image example]()

### Searching and Updating Information

Managing dynamic data in spreadsheets often involves searching for and updating specific information. The `Find sheet row` action **searches for a specified value within a designated column and returns the row number** where the value was found (or null if not found).
Example: You may have a column in your table with unique order IDs. Every time an update occurs, you want to log these changes (maybe a status update) in your spreadsheet, use the "Find sheet row" action to locate the relevant row for that particular order, and subsequent actions like "Update sheet row" or "Update cell" will allow you to modify information —such as the order status— in a different column but corresponding row.
This action can also be paired with a decision point to check if the unique value already exists in the spreadsheet. If the output is null, you can add a new entry; otherwise, update the existing one.

![Image example]()

[//]: <Show Airtable workflow example>

### Iterating Through Spreadsheet Rows

Many times workflows require to process data from a spreadsheet by iterating through its rows, either to extract data or to perform some processing and updates. In Blackbird, there are several ways you can loop through each row in a spreadsheet’s used range (or a subset), retrieve data from multiple columns, and add new data to these same rows.

#### Iterating Using a Generated Range:
If you already know the rows or subset of rows you want to work with, you can generate a range and iterate through it, using each number in the range as row number. 
1. Use the `Generate range` action in the Utilities app and input start and end numbers. E.g. inputing 2 as start and 5 as end will return [2,3,4,5].
2. Add a loop to iterate through the range, using the loop output as the current row number.
3. Inside the loop, use the `Get sheet cell` action to retrieve data by composing the cell address (combining the known column with the current row number from the loop).
4. After processing the extracted data, use the `Update sheet cell` action to add your result, or mark the row as processed.

![Image of generated range process]()

#### Iterating Using "Get Used Range":
When the number of rows in the spreadsheet is unknown, you can dynamically get the used range.

1. Use the `Get used range` action to retrieve the total number of rows in the spreadsheet.
2. Generate a range based on the Row count output or use the Row numbers output directly as input for the loop.
3. As with the previous approach, loop through the rows, retrieve and process data with `Get sheet cell`, and then update or mark each row via `Update sheet cell`.

![Image of example]()

#### Iterating Through Rows Using Arrays:
If you need to extract multiple values from each row, treating each row as an array of cell values can simplify the process.

1. Use either `Get used range` or `Get range` to retrieve a set (or subset) of rows as arrays of cell values.
2. Add a loop with the actual Rows output as input.
3. Use the `Get entry by position` action from the Utilities app to extract specific column values based on their position in the array (e.g., position 3 for column C).

![Image example]()

### Importing Eggs

To import an Egg into your Nest:

1. Navigate to the Bird Editor section.
2. Click on Import on the top right.
3. Select the Egg (JSON) file to import and click `Import`.
4. Identify the newly created Bird and click on it to edit it.
5. Update the Connection details and any other needed input/output parameters or desired steps. Look for red warning signs next to the step name signaling missing details in said step.
6. Click Save/Publish.

![Importing Eggs](../../../assets/docs/eggs/ImportEggs.gif)
