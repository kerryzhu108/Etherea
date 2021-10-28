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
        "themeid": 1,
        "theme": "Climate Change",
        "taskid": 1,
        "descript": "Eat vegetarian",
        "points": 10
    },
    {
        "themeid": 1,
        "theme": "Climate Change",
        "taskid": 2,
        "descript": "Make your commute green",
        "points": 20
    },
    {
        "themeid": 1,
        "theme": "Climate Change",
        "taskid": 3,
        "descript": "Reduce use of plastic packaging",
        "points": 30
    }
]
```