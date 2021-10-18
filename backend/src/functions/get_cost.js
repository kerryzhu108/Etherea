var all_items = {
    "pasta de la pasta": { price: 12.00, url: "https://images.unsplash.com/photo-1598866594230-a7c12756260f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1008&q=80", display_name: "Pasta De La Pasta" },
    "pizza mama mia": { price: 13.00, url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=962&q=80", display_name: "Pizza Mama Mia" },
    "wine picotto fine": { price: 25.00, url: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80", display_name: "Wine Picotto Fine" },
    "bread du broad": { price: 5.00, url: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80", display_name: "Bread Du Broad" }
}

var discounts = {
    "MAMAMIA": 0.25
}

// Return all items as a list of strings and corresponding image urls.
function get_all_items() {
    var items = []
    Object.entries(all_items).forEach(([key, value]) => {
        items.push([value['display_name'], "$" + value['price'].toFixed(2), value["url"]]);
    });
    return items;
}

// Get the cost of a single item (without GST calculation)
// Throw an error if the item cannot be found.
function get_cost(item_name) {
    item_name = item_name.toLowerCase();
    if (item_name in all_items) {
        return all_items[item_name]["price"];
    }
    throw new Error("Item " + item_name + " could not be found.");
}

// Calculate the total cost of a cart of items, include GST.
function calculate_subtotal(items) {
    var total_cost = 0;

    for (var i = 0; i < items.length; i++) {
        try {
            total_cost += get_cost(items[i]);
        } catch (error) {
            throw new Error("Item " + items[i] + " could not be found.");
        }
    }

    return total_cost;
}

// Return tax based on given rate.
function get_tax(current_cost, tax) {
    return current_cost * tax;
}

// Return a discount, if discount is not found, return 0.
function get_discount(current_cost, code) {
    if (code in discounts) {
        return current_cost * discounts[code];
    }
    return 0;
}

module.exports = {
    calculate_subtotal,
    get_cost,
    get_tax,
    get_discount,
    get_all_items
}