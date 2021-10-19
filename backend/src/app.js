const express = require("express");
var bodyParser = require('body-parser');

var rootRouter = require("./routes/root");

const app = express();

function application_start() {
    console.log(`Server running on port ${port}`);
}

// Application middleware
app.use(express.json());
app.use(bodyParser.json());

// Route endpoints
app.use("/", rootRouter);

module.exports = app