const express = require("express");
var router = express.Router();

const { pool } = require('../config');

module.exports = router;

// Create new task and add to database
router.post("/themesTasks/:themeID", async(req, res) =>{
    try{
        // Create task
        const {themeID, descript, taskName, points} = req.body;

        // Get any rows in database that have the same task name
        var result = await pool.query("SELECT * FROM taskList WHERE taskName=$1", [taskName])
        if(result.rows.length > 0){
            return res.status(500).json({ error: {message: "A task with this name already exists."}})
        }

        // Adding new task to database
        await pool.query("INSERT INTO taskList (themeID, descript, taskName, points) VALUES ($1, $2, $3, $4) RETURNING *", [themeID, descript, taskName, points]);
        return res.json({message: "The new task has successfully been created."});
    } catch(error) {
        return res.status(400).send(error.message);
    }
})

// Create new theme and add to database
router.post("/themesAll", async(req, res) =>{
    try{
        // Setting the id, theme, statName, multiplier, and date to be launched
        const {theme, statName, multiplier, datelaunched, color} = req.body;

        // Trying to determine if any themes are already in the database
        var result = await pool.query("SELECT * FROM themes WHERE theme=$1", [theme])
        if(result.rows.length > 0){
            return res.status(500).json({ error: {message: "This theme has already been created."}})
        }

        // Adding new theme to database
        await pool.query("INSERT INTO themes (theme, multiplier, statName, dateLaunched, colour) VALUES ($1, $2, $3, to_date($4, 'yyyy-mm-dd'), $5) RETURNING *", [theme, multiplier, statName, datelaunched, color]);

        return res.json({ message: "A new theme has been successfully added to the list of themes."});
    } catch(error) {
        return res.status(400).send(error.message);
    }
})

module.exports = router