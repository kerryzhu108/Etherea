# Get Total Cost
Used to calculate the total cost of items in user's cart including GST and discount.

**URL** : `/get_total_cost/`

**Method** : `POST`

**Auth** : `NO`

**Data Example**

```json
{
    "items": ["bread du broad", "pasta de la pasta"],
    "discount": "MAMAMIA"
}
```
## Success Response
**Code** : `200 OK`

**Content Example**

```json
{
    "subtotal": "17.00",
    "tax": "1.66",
    "discount": "-4.25",
    "total": "22.91"
}
```

## Error Response
**Condition** : Requested item does not exist in list. Quantity is not a valid number.

**Code** : `400 BAD REQUEST`

**Content**
```json
{
    "error_message": "The requested item {item name} does not exist."
}
```