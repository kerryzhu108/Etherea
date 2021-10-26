const express = require("express");
var router = express.Router();

const flash = require("express-flash");
const session = require("express-session");

const {Pool} = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, 
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = router;