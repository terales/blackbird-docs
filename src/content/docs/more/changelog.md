---
  title: Changelog
  description: A global overview of all changes made to the Blackbird core platform
---
### (14-10-2024) 4.14

Main features: Checkpoints 🎉

##### Bird editor
- You can now create _checkpoints_ in the bird editor. Checkpoints in Blackbird workflows are control steps that enable Birds to pause and wait for different events before continuing their Flights. You can read more about checkpoints [here](/concepts/checkpoints).

##### Other
- The rules and nests dropdown when adding a user now also works when you were filtering the list.
- Birds containing Google and Microsoft related events can now properly be activated again after suspending.
- The polling information text is now properly aligned again.

### (24-09-2024) 4.13

Main features: Right click options, copy, paste and duplicate items.

##### Bird editor
- You can now right click on items in the bird editor to show a context menu. You can also left click on the three dots.
- From the context menu you can now rename, cut, copy, duplicate and delete items.
- From the + icon in the bird editor you can now paste copied items from your clipboard.
- The general bird options menu has received a different look.
- Blackbird will now inform you to enable the clipboard in your browser if you haven't done so already.

##### Other
- The convert operator now more clearly displays if it's configured incorrectly.

### (18-09-2024) 4.12

Main features: Webhooks can immediatly trigger after subscription.

#### SDK
- A new interface (`IAfterSubscriptionWebhookEventHandler`) with the `OnWebhookSubscribedAsync()` method has been added. This method is called directly after subscription and can be used to start flights at this point.

##### Bug fixes
- Polled flights now properly display on the flight page of new nests.
- Enabling skip action will not prevent you from saving the bird in certain cases anymore.
- Actions after a flow operator that is not triggered are now properly executed.

##### Other
- The file handling core has been updated to play more nicely with WorldServer.

### (10-09-2024) 4.11

Main features: Flow operator improvements and new composable input expressions.

##### Bird editor
- The "End flight" operator is available everywhere in your bird. The "End flight" operator will stop the flight when reached.
- The "End loop" operator will break out of the loop when reached. It is available in loops.
- "End flight" and "End loop" also have an optional condition input, so that one is not always forced to put them into a decision.
- A user can now compose texts in any textual input that does not have an input handler (dropdown) defined, by pressing the magic wand button above their cursor.
- The modal opened when clicking on the "+" button in the bird editor is redesigned.
- A friendly message is added to the compose operator to remind people they can now use the new text input expression feature.

##### Bug fixes
- The \ is no longer duplicated as \\ in custom inputs.
- A numeric list in a compose operator does no longer break a bird.
- Resolved several issues around importing .csv files into custom libraries.
- Flights are now properly removed from our workflow engine on unsubscription even if flights came in simultantiously.
- Missing flights on the flight page are now displayed.
- Resolved an edge case that didn't allow for the saving of bird modifications.

### (26-08-2024) 4.10 

Main features: Custom connection buttons and organization creation automations.

##### SDK
- Added the ability to customize the HTML of connection modals by supporting HTML templates in the SDK.
- Multiple related dynamic inputs are now available in events.
- App names and descriptions are now also updated when a new app version is pushed.

##### Bug fixes
- Fixed an incorrect error being displayed when a file was too large.
- Nest user added and nest user created API events are now correctly triggered.
- Creating a new connection now shows a loading icon.
- Retried actions now fail quicker once all retries are completed.

##### Other
- Default nests are now created when a new organization is created.

### (09-08-2024) 4.9 

Main features: Automatic loop creation.

##### Bird editor
- The list of available values now also shows values that are part of an array. F.e. when you can input a file, but a list of files is outputed by a previous action, you can still select this value.
- When selecting a value that is coming from an array, a loop will automatically be added around the action.

### (07-08-2024) 4.8.1 

Main features: Webhook performance improvements.

##### Flights
- Webhooks now perform better given the recent addition of action limitations in our workflow engine.

### (05-08-2024) 4.8 

Main features: concurrent actions per organization limitations on multi-tenant environments.

##### Flights
- Flights now by default process 6 concurrent actions per organization. This amount can be adjusted for each tenant.