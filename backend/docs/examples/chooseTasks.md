# Choose tasks
User selects tasks to view every day of that month. User does this once a month 
usually near the beginning upon theme change.

**URL** : `/chooseTasks`

**Method** : `POST`

**Auth** : `NO`

**Data Example**

```json
{
    "userid":1,
    "taskID":[2, 3, 5]
}
```

## Success Response
**Code** : `200 OK`

**Content Example**

```json
"Success! New tasks have been added for this month."
```