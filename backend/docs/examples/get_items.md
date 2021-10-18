# Get Items
Return a list of items currently available in the shop.

**URL** : `/get_items/`

**Method** : `GET`

**Auth** : `NO`

## Success Response
**Code** : `200 OK`

**Content Example**

```json
{
    "items": [
        [
            "Pasta De La Pasta",
            "$12.00",
            "https://images.unsplash.com/photo-1598866594230-a7c12756260f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1008&q=80"
        ],
        [
            "Pizza Mama Mia",
            "$13.00",
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=962&q=80"
        ],
        [
            "Wine Picotto Fine",
            "$25.00",
            "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
        ],
        [
            "Bread Du Broad",
            "$5.00",
            "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
        ]
    ]
}
```