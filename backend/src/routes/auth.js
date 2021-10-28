const express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { generateAccessToken, authenticateToken } = require("../token");

const { pool } = require('../config');
//const config = require('../config');
//const pool = new Pool(config.db);

// Registration endpoint
router.post('/register', [
    check("email").isEmail(),
    check("first_name").isString(),
    check("last_name").isString(),
    check("password").isString(),
    check("password2").isString()
], async (req, res) => {
    const errors = validationResult(req);

    if (password.length < 8) {
        errors.push({ message: "Password must be a least 8 characters long" });
    }
    
    if (password !== password2) {
        errors.push({ message: "Passwords do not match" });
    }

    if (!errors.isEmpty()) {
        // rerender the sign up page showing the error messages?
        // res.render("signUp.js", { errors });
        return res.status(400).json({ errors: errors.array() });
    } else {
        const body = req.body;

        const hashed_password = await bcrypt.hash(body.password, 10);

        pool.query("SELECT * FROM USERS WHERE email = $1", 
            [body.email], (err, results) => {
              if (err) {
                return res.status(400).json({ error: { message: err.toString() } });
              }      
              if (results.rows.length > 0) {
                //errors.push({ message: "Email already registered" })
                //return res.render("signUp.js", { message: "Email already registered" });
                return res.status(400).json({ error: { message: "Email already registered" } });
              } 
            }
        );

        // Attempt to insert the user into the database
        pool.query("INSERT INTO Users (email, password, firstname, lastname) values ($1, $2, $3, $4) RETURNING id",
            [body.email, hashed_password, body.first_name, body.last_name], (err, result) => {
                if (err) {
                    return res.status(400).json({ error: { message: err.toString() } });
                }

                // On successful registration, add user id to table progressInfo
                var userId = result.rows[0].id;
                pool.query("INSERT INTO progressInfo (id) VALUES ($1)", [userId], 
                    (err, result) => {
                        if (err) {
                            return res.status(400).json({ error: { message: err.toString() } });
                        }
                    });

                // On successful registration, return successful response
                return res.json({ message: `Successfully created user` });
            });
    }
});

router.post('/login', [
    check('email').isEmail(),
    check('password').isString()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const body = req.body;

    pool.query("SELECT password FROM users WHERE email=$1",
        [body.email], (err, result) => {
            if (err) {
                return res.status(400).json({ error: { message: err.toString() } });
            }

            // On successful registration, return successful response
            const password = result.rows[0].password;
            bcrypt.compare(body.password, password, (err, isMatch) => {
                if (err) {
                    return res.json({ error: { message: err.toString() } });
                }

                if (isMatch) {
                    // Generate an access token and send back to client
                    return res.json({ tokens: { access: generateAccessToken(body.email) } });
                } else {
                    return res.status(401).json({ error: { message: "Could not log in user, incorrect credentials." } });
                }
            });
        });
});

router.post("/tokentest", authenticateToken, (req, res) => {
    return res.json(req.user);
});

module.exports = router;