const express = require("express");

var router = express.Router();

router.get("/",
    function (req, res) {
        return res.json({ "message": "Message received!" });
    });

module.exports = router;