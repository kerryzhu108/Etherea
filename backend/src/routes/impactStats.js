const express = require("express");

var router = express.Router();

const { pool } = require('../config');

router.get("/impactStats/:userid", async(req, res) =>{
    const { userid } = req.params
    try {
        //NOTE: currently table does not exist on db
        const info = await pool.query("SELECT * FROM ImpactStats WHERE uid = $1", [userid]);
        res.json(info.rows)
    } catch (error) {
        return res.status(400).send(error.message);
    }
    finally{
        res.end();
    }
})