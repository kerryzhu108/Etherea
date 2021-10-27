# Login
Login and get an access token for a user.

**URL** : `/auth/login`

**Method** : `POST`

**Auth** : `YES`

**Data Example**

```json
{
    "email": "joesmith@gmail.com",
    "password": "reallysecurepassword",
}
```

## Success Response
**Code** : `200 OK`

**Content Example**

```json
{
    "token": {
        "access": "access-token-key"
    }
}
```

## Error Response
**Code** : `401 UNAUTHORIZED`

**Content Example**

```json
{
    "error": {
        "message": "Could not log in user, incorrect credentials."
    }
}
```