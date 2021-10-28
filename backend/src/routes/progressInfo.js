const express = require("express");

var router = express.Router();

const { pool } = require('../config');

router.get("/hello", async(req, res) =>{
    res.send("Hello World!")
})

module.exports = router;