const express = require("express");
var bodyParser = require('body-parser');

var rootRouter = require("./routes/root");
var progressRouter = require("./routes/progressInfo");

const app = express();

// Application middleware
app.use(express.json());
app.use(bodyParser.json());

// Route endpoints
app.use("/", rootRouter);
app.use(progressRouter);

module.exports = app