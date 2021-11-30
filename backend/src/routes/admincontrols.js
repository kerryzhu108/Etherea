const express = require("express");
var router = express.Router();

const { pool } = require('../config');

module.exports = router;

// Create new task and add to database
router.post("/themesTasks/:themeID", async(req, res) =>{
    try{
        // Create task
        const {id, themeID, descript, taskName, points} = req.body;
        const new_entry = req.body;

        // Get any rows in database that have the same task name
        var result = pool.query("SELECT * FROM v_theme_task WHERE taskName=$1", [new_entry.taskName])
        if(result.rows.length > 0){
            return res.status(500).json({ error: {message: "A task with this name already exists."}})
        }

        // Adding new task to database
        pool.query("INSERT INTO themesTasks (id, themeID, descript, taskName, points) VALUES ($1, $2, $3, $4, $5) RETURNING *", [new_entry.id, new_entry.themeID, new_entry.descript, new_entry.taskName, new_entry.points]);
        return res.json({message: "The new task has successfully been created."});
    } catch(error) {
        return res.status(400).send(error.message);
    }
})

// Create new theme and add to database
router.post("/themesAll", async(req, res) =>{
    try{
        // Setting the id, theme, statName, multiplier, and date to be launched
        const {id, theme, statName, multiplier, datelaunched} = req.body;
        const new_entry = req.body;

        // Trying to determine if any themes are already in the database
        var result = pool.query("SELECT * FROM themes WHERE theme=$1", [new_entry.theme])
        if(result.rows.length > 0){
            return res.status(500).json({ error: {message: "This task has already been created."}})
        }

        // Adding new theme to database
        pool.query("INSERT INTO themes (id, theme, multiplier, statName, datelaunched) VALUES ($1, $2, $3, $4, $5) RETURNING *", [id, theme, multiplier, statName, datelaunched]);

        return res.json({ message: "A new theme has been successfully added to the list of themes."});
    } catch(error) {
        return res.status(400).send(error.message);
    }
})

module.exports = router