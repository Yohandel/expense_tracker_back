const express = require('express');
const cors = require('cors');
const { mongoDb } = require('./db/mongodb');
const { readdirSync } = require('fs');
require('dotenv').config()
const jwt = require("jsonwebtoken");

const PORT = process.env.PORT

const app = express()

//middlewares
app.use(express.json())
app.use(cors())


//routes
readdirSync('./routes').map((route) => {
    app.use('/api/v1', require('./routes/' + route))
})

const server = () => {
    mongoDb()
    app.listen(PORT, () => {
        console.log('Listening to port', PORT);
    })
}

function authenticateToken(req, res, next) {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token);
    if (token === null) return res.status(401)

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403)
        req.user = decoded
        next();
    })
}

server()