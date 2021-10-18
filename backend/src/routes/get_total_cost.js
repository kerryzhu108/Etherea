const express = require("express");
const { body, validationResult } = require("express-validator");
var functions = require("./../functions/get_cost");

var router = express.Router();

const GST = 0.13;

// Get total cost of items in checkout cart.
router.post("/",
    body("items").isArray(),
    body("items.*").isString(),
    body("discount").isString(),
    function (req, res) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        var subtotal;
        try {
            subtotal = functions.calculate_subtotal(req.body.items);
        } catch (error) {
            return res.status(400).json({ errors: { message: error.toString() } })
        }

        var discount = functions.get_discount(subtotal, req.body.discount);
        var tax = functions.get_tax(subtotal - discount, GST);
        var total_cost = subtotal + tax - discount;

        return res.json({ subtotal: subtotal.toFixed(2), tax: tax.toFixed(2), discount: "-" + discount.toFixed(2), total: total_cost.toFixed(2) });
    });

module.exports = router