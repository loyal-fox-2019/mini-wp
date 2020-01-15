'use strict'

if(process.env.NODE_ENV == 'development') require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
// const router = require('./routes')
// const errorHandler = require('./middlewares/errorHandler')
const databaseAccess = process.env.MONGO_URI

mongoose.connect(databaseAccess, {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useFindAndModify: false
}, function(err) {
  if(err) console.log('database is an Error')
  else console.log(`database in an active ${databaseAccess}`)
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// app.use('/', router)
// app.use(errorHandler)

module.exports = app