const express = require('express');
const cors = require('cors');
const { mongoDb } = require('./db/mongodb');
const { readdirSync } = require('fs');
require('dotenv').config()
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT

const app = express()
const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
};

//middlewares
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())


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

server()