const express = require("express");
var router = express.Router();

const { pool } = require('../config');

module.exports = router;

// Create new task and add to database
router.post("/themesTasks", async(req, res) =>{
    try{
        const {themeid, theme, taskid, descript, points} = req.body;
        // Adding new task to database
        pool.query("INSERT INTO themesTasks (themeID, theme, taskID, descript, points) VALUES ($1, $2, $3, $4, $5) RETURNING *", [themeid, theme, taskid, descript, points]);
        res.json("The new task has been successfully added to the list of tasks.")
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

        // Adding new theme to database
        pool.query("INSERT INTO themesAll VALUES ($1, $2, $3) RETURNING *", [id, theme, datelaunched]);

        res.json("A new theme has been successfully added to the list of themes.")
    } catch(error) {
        return res.status(400).send(error.message);
    } finally{
        res.end();
    }
})