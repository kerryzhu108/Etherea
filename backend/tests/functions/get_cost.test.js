var functions = require("./../../src/functions/get_cost");

test("gets cost of single known item", () => {
    expect(functions.get_cost("bread du broad")).toBe(5.00);
});

test("throw an error with invalid item name", () => {
    expect(() => functions.get_cost("pineapple")).toThrowError();
});

test("throw an error with invalid item name in total cost", () => {
    var checkout = ["apple"];
    expect(() => functions.calculate_subtotal(checkout)).toThrowError();
});

test("calculate the total cost of a single item", () => {
    var checkout = ["bread du broad"];
    expect(functions.calculate_subtotal(checkout)).toBeCloseTo(5.00, 2);
});

test("calculate the total cost of multiple items", () => {
    var checkout = ["bread du broad", "pasta de la pasta"];
    expect(functions.calculate_subtotal(checkout)).toBeCloseTo(17.00, 2);
});

test("throw an error with invalid items in list", () => {
    var checkout = ["bread du broad", "apple"];
    expect(() => functions.calculate_subtotal(checkout)).toThrowError();
})

test("check that discounts are calculated properly", () => {
    expect(functions.get_discount(1.00, "MAMAMIA")).toBeCloseTo(0.25, 2);
});

test("check that invalid discount codes are not added", () => {
    expect(functions.get_discount(1.00, "INVALID")).toBeCloseTo(0, 2);
});

test("check that tax is calculated properly", () => {
    expect(functions.get_tax(1.00, 0.13)).toBeCloseTo(0.13, 2);
});