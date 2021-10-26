const express = require('express');
const { Pool } = require('pg');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('../config');
const bcrypt = require('bcrypt');

const pool = new Pool(config.db);

// Registration endpoint
router.post('/register', [
    check('email').isEmail(),
    check("first_name").isString(),
    check("last_name").isString(),
    check("password").isString()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const body = req.body;

    const hashed_password = await bcrypt.hash(body.password, 10);

    // Attempt to insert the user into the database
    pool.query("INSERT INTO USERS (email, password, firstname, lastname) values ($1, $2, $3, $4)",
        [body.email, hashed_password, body.first_name, body.last_name], (err, result) => {
            if (err) {
                return res.json({ error: { message: err.toString() } });
            }

            // On successful registration, return successful response
            return res.json({ message: `Successfully created user` });
        });
});

router.post('/login', [
    check('email').isEmail(),
    check('password').isString()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const body = req.body;

    pool.query("SELECT password FROM users WHERE email=$1",
        [body.email], (err, result) => {
            if (err) {
                return res.json({ error: { message: err.toString() } });
            }

            // On successful registration, return successful response
            const password = result.rows[0].password;
            bcrypt.compare(body.password, password, (err, isMatch) => {
                if (err) {
                    return res.json({ error: { message: err.toString() } });
                }

                if (isMatch) {
                    return res.json({ message: "Successfully logged in user." });
                } else {
                    return res.json({ error: { message: "Could not log in user, incorrect credentials." } });
                }
            });
        });
});

module.exports = router;