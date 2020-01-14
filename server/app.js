"use strict"

if (process.env.NODE_ENV === "development") {
    require('dotenv').config()
}

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const routes = require('./routes')
const errorHandler = require('./middleware/errorHandler')

mongoose.connect(MONGO_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('connected to database ' + MONGO_URI)
    }).catch((err) => {
        console.log('not connected. err : ' + err.message)
    });

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use('/', routes)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log('connected to port ' + PORT)
})