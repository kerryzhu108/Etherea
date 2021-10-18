const express = require("express");
var bodyParser = require('body-parser');

var get_cost = require("./routes/get_items");
var get_total_cost = require("./routes/get_total_cost");

const app = express();

function application_start() {
    console.log(`Server running on port ${port}`);
}

// Application middleware
app.use(express.json());
app.use(bodyParser.json());

// Route endpoints
app.use("/get_items", get_cost);
app.use("/get_total_cost", get_total_cost);

module.exports = app