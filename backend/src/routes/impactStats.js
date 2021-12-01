const express = require("express");

var router = express.Router();

const { pool } = require('../config');


//default values for used arguements
const default_lower_date = '1990-01-01';//default lowerbound date for date range when none is specified in parameter
const default_upper_date = '3000-01-01';//default upperbound date for date range when none is specified in parameter
const default_impact_multiplier = 1;
const default_no_theme_id = -1;//default theme id for when no parameter is entered, represents no theme selection, so this number needs to NOT be used by an actual themeid


//get points from tasks completed for a user within a certain date range and return that value multiplied with an impact multiplier.
//NOTE: date ranges are for datetodo only, not datecreated
router.get("/impactStats/points/:userid", async (req, res) => {
    const { userid } = req.params
    //const userid = req.query.uid;
    const lower_date = req.query.ld  || default_lower_date;//lowerbound on date range (inclusive)
    const upper_date = req.query.ud || default_upper_date;//upperbound on date range (inclusive)
    const impact_per_point = req.query.impact || default_impact_multiplier;//impact multiplier on points
    const themeid = req.query.tid || default_no_theme_id;//for filtering by themes, NOTE: minus -1 means we don't filter by theme
    try {
        //const result = await pool.query("SELECT * FROM ImpactStats WHERE uid = $1;", [userid]);
        //const result = await pool.query("SELECT id, 100*exp as emissionsreduced, exp/5 as animalssaved FROM progressinfo WHERE id = $1;", [userid]);
        //SELECT sum(points)*2 AS impact FROM TaskList l, TaskCompletion c WHERE c.userid = 1 AND c.taskid = l.id AND c.complete AND (c.datetodo >= '1990-01-01' AND c.datetodo <= '3000-01-01') AND l.themeid = 1 GROUP BY c.userid;
        
        if (themeid != default_no_theme_id){//theme id was specified in parameter
            const result = await pool.query(
                "SELECT sum(points)*$2 AS impact FROM TaskList l, TaskCompletion c WHERE c.userid = $1 AND c.taskid = l.id AND c.complete AND (c.datetodo >= $3 AND c.datetodo <= $4) AND l.themeid = $5 GROUP BY c.userid;"
                , [userid, impact_per_point, lower_date, upper_date, themeid]);
            res.json(result.rows);
        } else {
            const result = await pool.query(
                "SELECT sum(points)*$2 AS impact FROM TaskList l, TaskCompletion c WHERE c.userid = $1 AND c.taskid = l.id AND c.complete AND (c.datetodo >= $3 AND c.datetodo <= $4) GROUP BY c.userid;"
                , [userid, impact_per_point, lower_date, upper_date]);
            res.json(result.rows);
        }
        
        
    } catch (error) {
        return res.status(500).json({ error: { message: error.toString() } });
    }
    finally {
        res.end();
    }
})

router.get("/impactStats/calculator/:userid", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM impactstats WHERE uid=$1", [req.params.userid]);
        if (result.rows.length <= 0) return res.status(404).json({error: {message: "Unable to find specified user"}});
        return res.json({animals_saved: result.rows[0].animalssaved, emissions_reduced: result.rows[0].emissionsreduced});
    } catch (error) {
        return res.status(500).json({error: {message: "Internal server error"}});
    }
});

//get number of tasks completed, not complete yet, and total tasks for a user within a date range
//task counts are grouped by datetodo (due date of task)
//NOTE: date ranges are for datetodo only, not datecreated
router.get("/impactStats/completion/:userid", async (req, res) => {
    const { userid } = req.params
    //const userid = req.query.uid;
    const lower_date = req.query.ld  || default_lower_date;//lowerbound on date range (inclusive)
    const upper_date = req.query.ud || default_upper_date;//upperbound on date range (inclusive)
    const themeid = req.query.tid || default_no_theme_id;//for filtering by themes, NOTE: minus -1 means we don't filter by theme
    try {
        
        if (themeid != default_no_theme_id){//theme id was specified in parameter
            const result = await pool.query(
                "SELECT c.datetodo, count(CASE WHEN c.complete THEN 1 END) AS completed, count(CASE WHEN NOT c.complete THEN 1 END) AS incomplete,  count(c.complete) as total FROM TaskList l, TaskCompletion c WHERE c.userid = $1 AND c.taskid = l.id AND (c.datetodo >= '$3' AND c.datetodo <= '$4') AND l.themeid = $5 GROUP BY c.datetodo;"
                , [userid, lower_date, upper_date, themeid]);
            res.json(result.rows);
        } else {
            const result = await pool.query(
                "SELECT c.datetodo, count(CASE WHEN c.complete THEN 1 END) AS completed, count(CASE WHEN NOT c.complete THEN 1 END) AS incomplete,  count(c.complete) as total FROM TaskList l, TaskCompletion c WHERE c.userid = $1 AND c.taskid = l.id AND (c.datetodo >= '$3' AND c.datetodo <= '$4') GROUP BY c.datetodo;"
                , [userid, lower_date, upper_date]);
            res.json(result.rows);
        }
        
        
    } catch (error) {
        return res.status(500).json({ error: { message: error.toString() } });
    }
    finally {
        res.end();
    }
})

module.exports = router;