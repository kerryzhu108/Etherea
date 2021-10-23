const express = require("express");

var router = express.Router();

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

router.get("/hello", async(req, res) =>{
    res.send("Hello World!")
})

module.exports = router;