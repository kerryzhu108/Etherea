const express = require("express");
var router = express.Router();

const { pool } = require('../config');

module.exports = router;

// Create new task and add to database
router.post("/themesTasks/:themeID", async(req, res) =>{
    try{
        // Create task
        const {themeid, theme, taskid, descript, points} = req.body;
        const new_entry = req.body;

        // Get any rows in database that have the same theme and description
        pool.query("SELECT * FROM v_theme_task WHERE theme=$1, descript=$2", [new_entry.theme, new_entry.descript], 
            (error, result) => {
                if(err){
                    return res.status(500).json({ error: { message: error.toString() }});
                }else if(result.rows.length > 0){
                    return res.status(400).json({ error: { message: "This task already exists. "}});
                }
            }
        )
        
        // Get any rows in database that have the same taskID
        pool.query("SELECT * FROM v_theme_task WHERE theme=$1", [new_entry.theme], 
            (error, result) => {
                if(err){
                    return res.status(500).json({ error: { message: error.toString() }});
                }else if(result.rows.length > 0){
                    return res.status(400).json({ error: { message: "This task ID is already taken. "}});
                }
            }
        )

        // Adding new task to database
        pool.query("INSERT INTO themesTasks (themeID, theme, taskID, descript, points) VALUES ($1, $2, $3, $4, $5) RETURNING *", [themeid, theme, taskid, descript, points]);
        return res.status(200).json({message: "The new task has successfully been created."});
    } catch(error) {
        return res.status(400).send(error.message);
    } finally{
        res.end();
    }
})

// Create new theme and add to database
router.post("/themesAll", async(req, res) =>{
    try{
        const currentDay = new Date();
        // Do not want January to be represented by 0;we want each month to be represented by 1-12
        const dataLaunched = new Date(currentDay.getFullYear(), ("0" + (currentDay.getMonth() + 1)).slice(-2), currentDay.getDate());
        // ID and theme name will be sent by the front-end, date will not be sent by front-end
        const {id, theme, datelaunched} = req.body;
        const new_entry = req.body;

        // Trying to determine if any themes are already in the database
        pool.query("SELECT * FROM theme WHERE theme=$1", [new_entry.theme],
            (error, results) => {
                if(error) {
                    return res.status(500).json({ error: { message : error.toString()}})
                }else if(results.rows.length > 0){
                    return res.status(400).json({ error: { message : "Theme already added. "}});
                }
            }
        )

        // Adding new theme to database
        pool.query("INSERT INTO themesAll VALUES ($1, $2, $3) RETURNING *", [id, theme, datelaunched]);

        return res.status(200).json({ message: "A new theme has been successfully added to the list of themes."});
    } catch(error) {
        return res.status(400).send(error.message);
    } finally{
        res.end();
    }
})

module.exports = router