const express = require('express');
var router = express.Router();
const { check, validationResult, body } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateAccessToken, authenticateToken, generateRefreshToken } = require("../token");

const { pool } = require('../config');
//const config = require('../config');
//const pool = new Pool(config.db);

// Registration endpoint
router.post('/register', [
    check("first_name").isString().isLength({ min: 1 }),
    check("last_name").isString().isLength({ min: 1 }),
    check("email").isEmail(),
    check("password").isString().isLength({ min: 4 }),
    check("confirmPassword").isString().isLength({ min: 4 })
], async (req, res) => {
    const errors = validationResult(req);

    const body = req.body;

    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    if (body.password !== body.confirmPassword) {
        return res.status(400).json({ error: { message: "Passwords do not match" } });
    }

    try {

        const hashed_password = await bcrypt.hash(body.password, 10);
        // Determine if this email is already in use
        var result = await pool.query("SELECT * FROM users WHERE email=$1", [body.email]);
        if (result.rows.length > 0) return res.status(400).json({ error: { message: "Email already registered" } });

        // Insert registered user into database
        result = await pool.query(`INSERT INTO Users (email, password, firstname, lastname) 
    values ($1, $2, $3, $4) RETURNING uid`,
            [body.email, hashed_password, body.first_name, body.last_name]);

        const uid = result.rows[0].uid;
        result = await pool.query("INSERT INTO progressInfo (id) VALUES ($1)", [uid]);
        result = await pool.query("INSERT INTO impactStats (uid) VALUES ($1)", [uid]);

        return res.json({ message: "Successfully created user" });
    } catch (err) {
        return res.status(500).json({ error: { message: err.toString() } });
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

    try {
        var result = await pool.query("SELECT password, uid FROM users WHERE email=$1", [body.email]);
        if (result.rows.length <= 0) {
            return res.status(401).json({ error: { message: "Email does not exist" } })
        }

        const password = result.rows[0].password;
        const isMatch = await bcrypt.compare(body.password, password);
        if (!isMatch) return res.status(401).json({ error: { message: "Invalid password" } });

        const access_token = generateAccessToken(body.email);
        const refresh_token = generateRefreshToken(body.email);
        const uid = result.rows[0].uid;

        result = await pool.query("UPDATE users SET refresh=$1 WHERE email=$2", [refresh_token, body.email]);
        return res.json({ userid: uid, tokens: { access: access_token, refresh: refresh_token } });


    } catch (err) {
        return res.status(500).json({ error: { message: err.toString() } });
    }
});

// Generate a new pair of access refresh tokens
// should be used once access tokens have expired.
router.post("/refresh", [
    check("refresh").isString()
], async (req, res) => {
    const body = req.body;

    try {
        req.user = jwt.verify(body.refresh, process.env.TOKEN_SECRET);
        var result = await pool.query("SELECT refresh, uid FROM users WHERE email=$1", [req.user.email]);
        if (result.rows.length <= 0) return res.status(401).json({ error: { message: "Email does not exist" } });
        if (result.rows[0].refresh != body.refresh) return res.status(401).json({ error: { message: "Invalid refresh token" } });

        const userid = result.rows[0].userid;
        const access_token = generateAccessToken(req.user.email);
        const refresh_token = generateRefreshToken(req.user.email);

        result = await pool.query("UPDATE users SET refresh=$1 WHERE email=$2", [refresh_token, req.user.email]);
        return res.json({ userid: userid, tokens: { access: access_token, refresh: refresh_token } });

    } catch (err) {
        return res.status(500).json({ error: { message: err.toString() } });
    }
});

router.post("/externalClient", 
    async (req, res) => {
        // front end send email, first_name, last_name
        const body = req.body;

        var uid = 0;
        try {
            // Determine if this email is already registered into the database 
            var result = await pool.query("SELECT uid FROM users WHERE email=$1", [body.email]);
            // user is already registered into the database
            if (result.rows.length > 0) {
                uid = result.rows[0].uid;
            } else {
                // register user into the database 
                result = await pool.query(`INSERT INTO Users (email, firstname, lastname) 
                                           values ($1, $2, $3) RETURNING uid`,
                    [body.email, body.first_name, body.last_name]);
    
                uid = result.rows[0].uid;
                result = await pool.query("INSERT INTO progressInfo (id) VALUES ($1)", [uid]);
                result = await pool.query("INSERT INTO impactStats (uid) VALUES ($1)", [uid]);
            }
            const access_token = generateAccessToken(body.email);
            const refresh_token = generateRefreshToken(body.email);

            result = await pool.query("UPDATE users SET refresh=$1 WHERE email=$2", [refresh_token, body.email]);
            return res.json({ userid: uid, tokens: { access: access_token, refresh: refresh_token } });

        } catch (err) {
            return res.status(500).json({ error: { message: err.toString() } });
        }
});

// Get user type based on the sent token
router.get("/type", authenticateToken, async (req, res) => {
    // Once user has been verified (through middleware authenticateToken)
    // obtain their user type from the database.
    try {
        const result = await pool.query("SELECT type from USERS WHERE email=($1)", [req.user.email]);
        if (result.rows.length == 0) return res.status(404).json({error: {message: "User with provided access token not found"}});
        const type = result.rows[0].type;

        // Otherwise, return the user type back to the sender
        return res.json({type: type});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: {message: "Internal server error"}});
    }
});

module.exports = router;