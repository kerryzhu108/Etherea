# Get Leaderboard data
Return a list of all player ids, firstnames, lastnames, and experience points

**URL** : `/leaderboard/`

**Method** : `GET`

**Auth** : `NO`

## Success Response
**Code** : `200 OK`

**Data Example**

```json
{
    "playerIDs": [1, 2],
    "first_names": ['Joe', 'Jill'],
    "last_names": ['Jackson', 'Jackie'],
    "exp_points": [10, 5]
}
```
