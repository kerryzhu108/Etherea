const express = require("express");

var router = express.Router();

const { pool } = require('../config');

var level_exp = 50//experience required for each level

router.get('/leaderboard', async (req, res) => {
    try {
      const client = await pool.connect();
      //naive approach: send entire leaderboard worth of data, may need to change to paginate
      const result = await client.query(
          "SELECT dense_rank() over(ORDER BY p.exp DESC) as rank, u.uid, CONCAT(u.firstname, ' ', u.lastname) AS name, p.exp, p.exp/$1 AS level FROM users u, progressInfo p WHERE u.uid = p.id ORDER BY p.exp DESC;", [level_exp]);
      const results = { 'results': (result) ? result.rows : null};
      
      res.json(results);
      client.release();
    } catch (err) {
      res.status(500).json({error: {message: err.toString()}});
    }
  })

module.exports = router;

