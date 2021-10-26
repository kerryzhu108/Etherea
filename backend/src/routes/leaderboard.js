const express = require("express");

var router = express.Router();

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

router.get('/leaderboard', async (req, res) => {
    try {
      const client = await pool.connect();
      //naive approach: send entire leaderboard worth of data, may need to change to paginate
      const result = await client.query(
          "SELECT u.username, p.exp FROM user u JOIN progressInfo p WHERE u.id = p.id ORDER BY p.exp DESC");
      const results = { 'results': (result) ? result.rows : null};
      
      res.json(results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

module.exports = router;

