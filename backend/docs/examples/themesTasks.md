# All tasks for a particular theme
Gets all the tasks associated with a specific theme ID. Includes task ID, description and points.

**URL** : `/themesTasks/:themeid`

**Method** : `GET`

**Auth** : `NO`


## Success Response
**Code** : `200 OK`

**Content Example**

```json
[
    {
        "id": 1,
        "themeid": 1,
        "descript": "Eat vegetarian",
        "taskName": "Vegetarian Challenge",
        "points": 10
    },
    {
        "id": 2,
        "themeid": 1,
        "descript": "Make your commute green",
        "taskName": "A New Way to Travel",
        "points": 20
    },
    {
        "id": 3
        "themeid": 1,
        "descript": "Reduce use of plastic packaging",
        "taskName": "Reduce, Reuse, Recycle",
        "points": 30
    }
]
```
