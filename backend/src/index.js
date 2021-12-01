const app = require("./app");

const port = process.env.port || 3000;
const ip = process.env.IP || "localhost"

// Application start
app.listen(port, ip, () => {
    console.log(`Server running on ${ip}:${port}`);
});