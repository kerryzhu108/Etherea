# User's tasks
Get all tasks for a particular user that day. Includes information on each task such as
whether user has completed it for that day.

**URL** : `/userTask/:userid`

**Method** : `GET`

**Auth** : `NO`


## Success Response
**Code** : `200 OK`

**Content Example**

```json
[
    {
        "userid": 1,
        "taskid": 2,
        "descript": "Make your commute green",
        "themeid": 1,
        "theme": "Climate Change",
        "complete": true,
        "datetodo": "2021-10-24T04:00:00.000Z",
        "points": 20
    },
    {
        "userid": 1,
        "taskid": 4,
        "descript": "Support youth-led Movements",
        "themeid": 1,
        "theme": "Climate Change",
        "complete": false,
        "datetodo": "2021-10-24T04:00:00.000Z",
        "points": 10
    }
]
```