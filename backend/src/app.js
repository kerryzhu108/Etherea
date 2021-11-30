const express = require("express");
var bodyParser = require('body-parser');

var rootRouter = require("./routes/root");
var taskRouter = require("./routes/taskSystem");
var leaderboardRouter = require("./routes/leaderboard");
var impactStatsRouter = require("./routes/impactStats");
var profileRouter = require("./routes/profile");
var authRouter = require("./routes/auth");
var imageRouter = require("./routes/imageupload");
var adminRouter = require("./routes/admincontrols")

require("dotenv").config();
const { createTables, dropTables } = require("./config.js");

if (process.env.resetDB=='true') {
  dropTables().then(() => createTables());
}

const app = express();

// Application middleware
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Route endpoints
app.use("/", rootRouter);
app.use("/", taskRouter);
app.use("/", leaderboardRouter);
app.use("/", impactStatsRouter);
app.use("/auth/", authRouter);
app.use("/profile/", profileRouter);
app.use("/", imageRouter);
app.use("/", adminRouter);

module.exports = app;