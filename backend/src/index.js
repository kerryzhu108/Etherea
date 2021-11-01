const app = require("./app");

const port = 3000;

// Application start
app.listen(process.env.PORT || port, process.env.IP || "localhost", () => {
    console.log(`Server running on port ${process.env.PORT}`);
});