const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const errorHandler = require('./middlewares/errorHandler')
const router = require('./router')

const port = 3000
const app = express()

mongoose.connect('mongodb://localhost:27017/minWp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(success => {
        console.log('MiniWP Connected to MongoDB')
    })
    .catch(err => {
        console.log(err)
    })
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', router)
app.use(errorHandler)
app.listen(port, () => { console.log('MiniWP Server Running on port : ' + port) })