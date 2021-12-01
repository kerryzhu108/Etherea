const app = require("./app");

const port = process.env.PORT || 3000;
const ip = process.env.IP || "localhost"

// Application start
app.listen(port, () => {
    console.log(`Server running on ${ip}:${port}`);
});