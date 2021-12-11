# Adds a theme.
Allows an admin to add a theme, given a theme name, multiplier, statName, dateLaunched, and colour.

**URL** : `/themesTasks/:themeID`

**Method** : `POST`

**Auth** : `NO`

## Success Response
**Code** : `200 OK`

**Example**

```json
[
  {
    "theme": "Climate Change",
    "statName": "CO2 Emissions Reduced",
    "multiplier": 2,
    "datelaunched": "2023-10-01",
    "color": "#A0E3B2"
  }
]
```

# Adds a task
Allows an admin to add a task, given a task name, themeID, description, and points.

**URL** : `/themesTasks/:themeID`

**Method** : `POST`

**Auth** : `NO`

## Success Response
**Code** : `200 OK`

**Example**

```json
[
  {
    "themeID": 1,
    "taskName": "Clean Up Oceans",
    "descript": "Pick up 100 pieces of trash from the beaches.",
    "points": "30"
  }
]
```
