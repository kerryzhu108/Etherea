const connect = "postgres://etherea:1234@localhost/userlogin"

const express = require("express");

var router = express.Router();

const flash = require("express-flash");
const session = require("express-session");

const { Pool, Client } = require('pg')

var pool = new Client(connect);
pool.connect();

// just for testing 
// router.get("/",
// function (req, res) {
//         res.render("register.ejs");
//     });

router.post("/", 
async (req, res) => {
    // front end send (username, firstname, lastname, email, password)
    let { username, firstname, lastname, email, password, password2 } = req.body;
    console.log(username, firstname, lastname, email, password);
    //hashedPassword = await bcrypt.hash(password, 10);
    pool.query(`INSERT INTO users(username, firstname, lastname, email, password) VALUES ($1, $2, $3, $4, $5)`,
    [username, firstname, lastname, email, password],
        (err, res) => {
            if (!err) {
                console.log(res.rows);
            } else {
                console.log(err.message);
            }
          pool.end;
        });
    console.log("reached");
    }
);

module.exports = router;