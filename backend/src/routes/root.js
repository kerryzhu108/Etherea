const express = require("express");

var router = express.Router();

router.get("/",
    function (req, res) {
        return res.json({ "message": "Message received!" });
    });

// router.get('/db', async (req, res) => {
//     try {
//         const client = await pool.connect();
//         const result = await client.query('SELECT * FROM users');
//         const results = { 'results': (result) ? result.rows : null };
//         //res.render('pages/db', results );
//         res.json(results);
//         client.release();
//     } catch (err) {
//         console.error(err);
//         res.send("Error " + err);
//     }
// });

module.exports = router;