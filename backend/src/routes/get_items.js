const express = require("express");
const { body, validationResult } = require("express-validator");
var functions = require("../functions/get_cost");

var router = express.Router();

// Get total cost of items in checkout cart.
router.get("/",
    function (req, res) {
        return res.json({ items: functions.get_all_items() });
    });

module.exports = router