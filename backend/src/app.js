const express = require("express");
var bodyParser = require('body-parser');

var rootRouter = require("./routes/root");
var taskRouter = require("./routes/taskSystem");

const app = express();

// Application middleware
app.use(express.json());
app.use(bodyParser.json());

// Route endpoints
app.use("/", rootRouter);
app.use(taskRouter);

module.exports = app