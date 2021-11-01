const express = require('express');
var router = express.Router();
const { pool } = require('../config');

router.get('/:uid', (req, res) => {
    pool.query("SELECT firstname, lastname FROM users WHERE uid=$1", [req.params.uid]).then((result, err) => {
        if (result.rows.length <= 0) return res.status(404).json({ error: { message: "User not found" } });
        return res.json({ name: result.rows[0].firstname + " " + result.rows[0].lastname });
    }).catch((e) => {
        return res.status(500).json({ error: { message: e.toString() } });
    });
});

module.exports = router;