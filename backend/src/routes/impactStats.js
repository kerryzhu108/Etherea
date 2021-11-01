const express = require("express");

var router = express.Router();

const { pool } = require('../config');

router.get("/impactStats/:userid", async(req, res) =>{
    const { userid } = req.params
    try {
        await pool.query("SELECT * FROM ImpactStats WHERE uid = $1;", [userid]);
        res.json(info.rows)
    } catch (error) {
        return res.status(500).json({error: {message: error.toString()}});
    }
    finally{
        res.end();
    }
})

module.exports = router;