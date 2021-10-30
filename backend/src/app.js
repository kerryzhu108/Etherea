const express = require("express");
var bodyParser = require('body-parser');
const expressValidator = require('express-validator');

var rootRouter = require("./routes/root");
var taskRouter = require("./routes/taskSystem");
var leaderboardRouter = require("./routes/leaderboard");
var impactStatsRouter = require("./routes/impactStats");
var authRouter = require("./routes/auth");

require("dotenv").config();
const { createTables, dropTables } = require("./config.js");

dropTables().then(() => createTables());

const app = express();

// Application middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());
app.use(expressValidator(middlewareOptions));

// Route endpoints
app.use("/", rootRouter);
app.use("/", taskRouter);
app.use("/", leaderboardRouter);
app.use("/", impactStatsRouter);
app.use("/auth/", authRouter);

module.exports = app;