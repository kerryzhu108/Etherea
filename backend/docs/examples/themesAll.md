# Themes
Get all themes with their name and date they were launched.

**URL** : `/themesAll`

**Method** : `GET`

**Auth** : `NO`


## Success Response
**Code** : `200 OK`

**Content Example**

```json
[
    {
        "id": 1,
        "theme": "Climate Change",
        "multiplier": 5,
        "statName": "CO2 Emissions",
        "datelaunched": "2021-10-01T04:00:00.000Z",
        "colour": "#aaaaaa"
    },
    {
        "id": 2,
        "theme": "Mental Health",
        "multiplier": 2,
        "statName": "Mental Health",
        "datelaunched": "2021-11-01T04:00:00.000Z",
        "colour": "#000000"
    }
]
```
