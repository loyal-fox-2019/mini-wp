'use strict'

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const router = require('./routes')
const mongoose = require('mongoose')
const errorHandler = require('./middlewares/errorHandler')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan('dev'))

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => console.log('Connected to the database!'))
  .catch(() => console.log('Database connection failed!'))

app.use('/', router)
app.use(errorHandler)

module.exports = app;