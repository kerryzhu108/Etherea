# Register
Register a user.

**URL** : `/auth/register`

**Method** : `POST`

**Auth** : `NO`

**Data Example**

```json
{
    "email": "joesmith@gmail.com",
    "password": "reallysecurepassword",
    "first_name": "Joe",
    "last_name": "Smith"
}
```

## Success Response
**Code** : `200 OK`

**Content Example**

```json
{
    {
        "message": "Successfully created user"
    }
}
```