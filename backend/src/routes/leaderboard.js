const express = require("express");

var router = express.Router();

const { pool } = require('../config');

router.get('/leaderboard', async (req, res) => {
    try {
      const client = await pool.connect();
      //naive approach: send entire leaderboard worth of data, may need to change to paginate
      const result = await client.query(
          "SELECT u.id, CONCAT(u.firstname, ' ', u.lastname) AS name, p.exp FROM users u JOIN progressInfo p WHERE u.id = p.id ORDER BY p.exp DESC");
      const results = { 'results': (result) ? result.rows : null};
      
      res.json(results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

module.exports = router;

