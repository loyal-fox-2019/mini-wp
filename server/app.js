if (process.env.NODE_ENV === 'development') require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./router')
const errorHandler = require('./middlewares/errorHandler')

const port = process.env.PORT || 3000
const app = express()

mongoose
    .connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => {
        console.log('Mini WP Connected to MongoDB')
    })
    .catch(err => {
        console.log(err)
    })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', router)
app.use(errorHandler)

app.listen(port, () => { console.log('MiniWp Server Running on port : ' + port) })