# Little_Corner_Gallery

This app is destined to manage the users gallery in a easy fashion.
Users that wish to have an easier time managing their photos can use this app.

## Data model
| Field       | Type         | Notes                                |
| ----------- | ------------ | ------------------------------------ |
| title       | text         | required, max 100 chars              |
| favorite    | boolean      | toggled from the list, default false |
| private     | fixed values | public, private, shared              |
| album       | relation     | Outings, Daily, Others               |
| user        | relation     | the owner of the item (from week 11) |

Sample data used across all stages:
1. Flower_garden.png, active, public
2. New_outfit.png, done, private
3. Pretty_Sunset.png, active, shared

## How to run
Open `index.html` in a browser. No build step, no server.
## AI usage
| Tool           | Used for                                  |
| -------------- | ----------------------------------------- |
| <e.g. ChatGPT> | <what exactly, e.g. CSS Grid, stage 1>    |
Details per stage: see the ai-log/ folder.

## Status
- [x] Stage 1: static mockup
☐ Stage 2: data logic in JavaScript