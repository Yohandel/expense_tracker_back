const express = require('express');
const cors = require('cors');
const { mongoDb } = require('./db/mongodb');
const {readdirSync} = require('fs');
require('dotenv').config()

const PORT = process.env.PORT

const app = express()

//middlewares
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World')
})

//routes
readdirSync('./routes').map((route)=>{
    app.use('/api/v1', require('./routes/' + route))
})

const server = () => {
    mongoDb()
    app.listen(PORT, () => {
        console.log('Listening to port', PORT);
    })
}

server()