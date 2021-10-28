const express = require("express");

var router = express.Router();

const { pool } = require('../config');

/* Get user's progress info (level, exp points, streak)
Returns the following json:
{
    "id": 1,
    "level": 6,
    "exp": 5,
    "streak": 3
}
*/
router.get("/progressInfo/:userid", async(req, res) =>{
    const { userid } = req.params
    try {
        const info = await pool.query("SELECT * FROM progressInfo WHERE id = $1", [userid]);
        res.json(info.rows[0])
    } catch (error) {
        return res.status(400).send(error.message);
    }
    finally{
        res.end();
    }
})


/*Add new user row with default game values.
Pass the following body for this post request:
{
    "userid":1
}
*/
router.post("/progressInfo", async(req, res) =>{
   try {
       const {userid} = req.body;
       const result = await pool.query(
           "INSERT INTO progressInfo (id) VALUES ($1) RETURNING *", 
           [userid]);

        res.json(result.rows[0]);
   } catch (error) {
        return res.status(400).send(error.message);
   }
   finally{
       res.end();
   }
})

/* Get all themes(id, name, date theme was launched)
Returns the follow json:
[
    {
        "id": 1,
        "theme": "Climate Change",
        "datelaunched": "2021-10-01T04:00:00.000Z"
    },
    {
        "id": 2,
        "theme": "Mental Health",
        "datelaunched": "2021-11-01T04:00:00.000Z"
    }
]
*/
router.get("/themesAll", async(req, res) =>{
    try {
        const info = await pool.query("SELECT * FROM themes");
        res.json(info.rows)
    } catch (error) {
        return res.status(400).send(error.message);
    }
    finally{
        res.end();
    }
})

/* Get all tasks for a particular theme(themeID, theme, taskID, task name/description, task points)
Returns the following json:
[
    {
        "themeid": 1,
        "theme": "Climate Change",
        "taskid": 1,
        "descript": "Eat vegetarian",
        "points": 10
    },
    {
        "themeid": 1,
        "theme": "Climate Change",
        "taskid": 2,
        "descript": "Make your commute green",
        "points": 20
    },
    {
        "themeid": 1,
        "theme": "Climate Change",
        "taskid": 3,
        "descript": "Reduce use of plastic packaging",
        "points": 30
    }
]
*/
router.get("/themesTasks/:themeid", async(req, res) =>{
    try {
        const {themeid} = req.params;
        const info = await pool.query("SELECT * FROM v_theme_task WHERE themeID = ($1)", [themeid]);
        res.json(info.rows)
    } catch (error) {
        return res.status(400).send(error.message);
    }
    finally{
        res.end();
    }
})

// Post request. User chooses which tasks for the month
/* Send the following body to use this end point. Don't send taskIDs one at a time,
send them all at once in array taskID when the user hits Choose Habits.
{
    "userid":1,
    "taskID":[2, 3, 5]
}
*/
router.post("/chooseTasks", async(req, res) =>{
    try {
        const {userid, taskid} = req.body;

        const today = new Date(); // get today's date
        const month = ("0" + (today.getMonth() + 1)).slice(-2); // add 0 if month is single digit
        const ldate = new Date(today.getFullYear(), month, 0).getDate(); // 1st day of next month minus 1 day

        // loop from 1st day of month to last day of month
        for(let i = 1; i <= ldate; i++){
            let date = new Date(today.getFullYear(), month - 1, i);
            taskid.forEach(task =>{
                pool.query("INSERT INTO taskCompletion (userID, taskID, dateTodo, complete, dateCreated) VALUES ($1, $2, $3, $4, $5) RETURNING *",
                [userid, task, date, false, today])

            })
        }
        //res.json(`Success! New tasks have been added to the month ${month}`);
    } catch (error) {
         return res.status(400).send(error.message);
    }
    finally{
        res.end();
    }
 })


// Get all user's tasks and task info for today. Flags for each task completion is also returned!
/* The following json is returned.
[
    {
        "userid": 1,
        "taskid": 2,
        "descript": "Make your commute green",
        "themeid": 1,
        "theme": "Climate Change",
        "complete": true,
        "datetodo": "2021-10-24T04:00:00.000Z",
        "points": 20
    },
    {
        "userid": 1,
        "taskid": 4,
        "descript": "Support youth-led Movements",
        "themeid": 1,
        "theme": "Climate Change",
        "complete": true,
        "datetodo": "2021-10-24T04:00:00.000Z",
        "points": 10
    }
 */
router.get("/userTask/:userid", async(req, res) =>{
    const { userid } = req.params
    try {
        const info = await pool.query("SELECT * FROM v_userTask WHERE userID = $1 AND datetodo =$2", [userid, new Date()]);
        res.json(info.rows)
    } catch (error) {
        return res.status(400).send(error.message);
    }
    finally{
        res.end();
    }
})


// Update when user finishes a task/checkmarks task. Update user's level, points/exp, streak
/* Send the following body to use this put request.
{
    "userid": 1,
    "taskid": 2
}
*/
router.put('/taskFinished', async(req, res) => {
    try {   
        const {userid, taskid } = req.body;
        
        (async () => {
            const client = await pool.connect()
            try {
                await client.query('BEGIN') //start transaction

                // Check if this task is already completed
                const completedQuery = "SELECT complete FROM taskCompletion WHERE userID = $1 AND taskID = $2 AND dateTodo = $3";
                const completedRow = await client.query(completedQuery,[userid, taskid, new Date()]);
                const completed = completedRow.rows[0].complete;

                if(completed){
                    return;
                }

                // Get the points for this particular task
                const pointsQuery = "SELECT points FROM taskList WHERE id = $1";
                const pointsRow = await client.query(pointsQuery,[taskid]);
                let points = pointsRow.rows[0].points;

                // Get user's points
                const userPointsQ = "SELECT exp, level FROM progressInfo WHERE id = $1";
                const userRow = await client.query(userPointsQ, [userid]);
                const userPoints = userRow.rows[0].exp;
                const userLevel = userRow.rows[0].level;

                let newPoints = points + userPoints;
                let newLevel = userLevel;

                if(newPoints >= 50){ // > 50, points-=50 and level++
                    newPoints = newPoints - 50;
                    newLevel = newLevel + 1;
                }

                const daysFromNoQ =    
                `SELECT count(*) AS allDays FROM
                (SELECT DISTINCT (datetodo) FROM taskCompletion
                WHERE datetodo BETWEEN( -- select day after last incomplete task day    to    today
                    SELECT COALESCE(MAX(datetodo), $4) FROM taskCompletion 
                        WHERE userID = $1 AND complete = $2 AND datetodo < $3)+1
                    AND $3) fromNo`;
                const daysFromNo= await client.query(daysFromNoQ, [userid, false, new Date(), new Date(2021, 01, 01)]);
                
                const todayQ = 
                `SELECT count(*) AS today FROM 
                (SELECT DISTINCT(datetodo) FROM taskCompletion
                WHERE userID = $1 AND complete = $2 AND datetodo = $3) totalCount`;
                const today = await client.query(todayQ, [userid, false, new Date()]);

                const streak = daysFromNo.rows[0].alldays - today.rows[0].today;
                // Update task completed to true
                const txtStatus = "UPDATE taskCompletion SET complete = $1 WHERE userID=$2 AND taskID=$3 AND datetodo = $4 RETURNING *";
                const updsts = await client.query(txtStatus,[true, userid, taskid, new Date()]) ;

                // Update user progress info(level, exp)
                const txtLv = "UPDATE progressInfo SET level = $1, exp = $2, streak = $3 WHERE id = $4";
                const updLv = await client.query(txtLv, [newLevel, newPoints, streak, userid]);
                
                //console.log(userid + '  '+taskid);
                await client.query('COMMIT')
            } catch (e) {
                await client.query('ROLLBACK')
                throw e
            } finally {
                client.release()
            }
          })
          ().catch(e => console.error(e.stack))
        
    } catch (error) {
        
    }
    finally{
        res.end();
    }
})

module.exports = router;