const jwt = require("jsonwebtoken");

function generateAccessToken(email) {
    return jwt.sign({ email: email }, process.env.TOKEN_SECRET, { expiresIn: 1800 });
}

function generateRefreshToken(email) {
    return jwt.sign({ email: email }, process.env.TOKEN_SECRET, { expiresIn: '30d' });
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

module.exports = { generateAccessToken, authenticateToken, generateRefreshToken };