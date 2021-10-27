const app = require("./app");
const dotenv = require("dotenv");

const port = 3000;

// Configure environment variables
dotenv.config();

// Application start
app.listen(process.env.PORT || port, () => {
    console.log(`Server running on port ${port}`);
});