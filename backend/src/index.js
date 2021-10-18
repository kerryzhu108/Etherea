const express = require("express");
const app = require("./app");

const port = 3000;

// Application start
app.listen(process.env.PORT || port, () => {
    console.log(`Server listening on port ${port}`);
});