'use strict'

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT
const mongoose = require('mongoose')
const routers = require('./routers/index')
const errorHandler = require('./middleware/errorhandler')

mongoose.connect(process.env.DB_HOST, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connected!')
});

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use('/miniwp', routers)
app.use(errorHandler)

app.listen(port, () => console.log(`app listening on port ${port}`))