const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1];
    if (token === null) { return res.status(401).json({message:'Error'}) }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) { return res.status(403).json({Message: 'Token invalid'}) }
        req.user = decoded
        next();
    })
}

module.exports = {authenticateToken}