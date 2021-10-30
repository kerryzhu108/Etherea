const express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateAccessToken, authenticateToken, generateRefreshToken } = require("../token");

const { pool } = require('../config');
//const config = require('../config');
//const pool = new Pool(config.db);

const formatValidationResult = validationResult.withDefaults({
    formatter: error => {
        if ( error.param === "email" ) {
            if ( error.value === "" ) {
                return { message: "The Email field is required. " };
            }
            return { message: "Please enter a valid email. " };
        }
        if ( error.param === "first_name" ) {
            if ( error.value === "" ) {
                return { message: "The First Name field is required. " };
            }
            return { message: "First Name contains invalid characters. " };
        }
        if ( error.param === "last_name" ) {
            if ( error.value === "" ) {
                return { message: "The Last Name field is required. " };
            }
            return { message: "Last Name contains invalid characters. " };
        }
        if ( error.param === "password" && error.value === "" ) {
            return { message: "The Password field is required. " };
        }
        if ( error.param === "confirmPassword" && error.value === "" ) {
            return { message: "The Confirm Password field is required. " };
        }
        if ( (error.param === "password" || error.param === "confirmPassword") ) {
            if ( error.value.length < 8 ) {
                return { message: "Password must be a least 8 characters long. " };
            }
            return { message: "Password contains invalid characters. " };
        } else {
            return null;
        }
    }
  });

// Registration endpoint
router.post('/register', [
    check("first_name").isString().isLength({ min: 1 }),
    check("last_name").isString().isLength({ min: 1 }),
    check("email").normalizeEmail().isEmail(),
    check("password").isString().isLength({ min: 8 }),
    check("confirmPassword").isString().isLength({ min: 8 })
], async (req, res) => {
    const body = req.body;
    const errors = formatValidationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    } else {
        if ( body.password !== body.confirmPassword ) {
            return res.status(400).json({ error: { message: "Passwords do not match. " } });
        }

        const hashed_password = await bcrypt.hash(body.password, 10);

        pool.query("SELECT * FROM USERS WHERE email = $1", [body.email.normalizeEmail()], 
            (err, results) => {
                if (err) {
                    // Internal server error
                    return res.status(500).json({ error: { message: err.toString() } });
                }
                if (results.rows.length > 0) {
                    return res.status(400).json({ error: { message: "Email already registered. " } });
                }
            }
        );

        // Attempt to insert the user into the database
        // On successful registration, add user id to table progressInfo and table impactStats
        ;(async () => {
            const client = await pool.connect()
            try {
                const res = await client.query(`INSERT INTO Users (email, password, firstname, lastname) 
                                                values ($1, $2, $3, $4) RETURNING uid`,
                            [body.email.normalizeEmail(), hashed_password, body.first_name, body.last_name])
                var userId = res.rows[0].uid;
                client.query("INSERT INTO progressInfo (id) VALUES ($1)", [userId])
                client.query("INSERT INTO impactStats (uid) VALUES ($1)", [userId])
            } finally {
                client.release()
            }
            })()
            .catch(
                err => { 
                    // Internal server error
                    return res.status(500).json( { error: { message: err.toString() } } ) 
                }
            )

        // On successful registration, return successful response
        return res.status(200).json({ message: `Successfully created user` });
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

    pool.query("SELECT password, uid FROM users WHERE email=$1",
        [body.email], (err, result) => {
            if (err) {
                return res.status(400).json({ error: { message: err.toString() } });
            }

            if (result.rows.length <= 0) {
                return res.status(401).json({ error: { message: "Email does not exist" } });
            }

            // On successful registration, return successful response
            const password = result.rows[0].password;
            bcrypt.compare(body.password, password, (err, isMatch) => {
                if (err) {
                    return res.json({ error: { message: err.toString() } });
                }

                if (isMatch) {
                    // Generate an access token and send back to client
                    var access_token = generateAccessToken(body.email);
                    var refresh_token = generateRefreshToken(body.email);
                    const userid = result.rows[0].uid;

                    // Store refresh token in database
                    pool.query("UPDATE users SET refresh=$1 WHERE email=$2", [refresh_token, body.email], (err, result) => {
                        if (err) {
                            return res.status(400).json({ error: { message: err.toString() } });
                        }

                        return res.json({ userid: userid, tokens: { access: access_token, refresh: refresh_token } });
                    });
                } else {
                    return res.status(401).json({ error: { message: "Invalid password" } });
                }
            });
        });
});

router.post("/refresh", [
    check("refresh").isString()
], async (req, res) => {
    const body = req.body;
    jwt.verify(body.refresh, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.status(401).json({ error: { message: "Invalid refresh token" } });
        req.user = user;

        pool.query("SELECT refresh, id FROM users WHERE email=$1", [req.user.email], (err, result) => {
            if (err) return res.status(400).json({ error: { message: err.toString() } });
            if (result.rows.length <= 0) return res.status(400).json({ error: { message: "Email does not exist" } });
            if (result.rows[0].refresh !== body.refresh) return res.status(401).json({ error: { message: "Invalid refresh token" } });

            const userid = result.rows[0].userid;
            const access_token = generateAccessToken(req.user.email);
            const refresh_token = generateRefreshToken(req.user.email);

            pool.query("UPDATE users SET refresh=$1 WHERE email=$2", [refresh_token, req.user.email], (err, result) => {
                if (err) return res.status(400).json({ error: { message: err.toString() } });

                return res.json({ userid: userid, tokens: { access: access_token, refresh: refresh_token } });
            });
        });
    });

    // Generate a new access and refresh token pair
});

module.exports = router;