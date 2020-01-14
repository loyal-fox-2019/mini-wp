require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Express server is running on port ${port}`))

const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

const dbName = 'zoe-loyal-wp-dev00'
const mongooseConnectionString = `mongodb://localhost:27017/${dbName}`

mongoose.connect(mongooseConnectionString, {
   useCreateIndex: true,
   useNewUrlParser: true,
   useUnifiedTopology: true
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

if(process.env.NODE_ENV == 'development') {
   const morgan = require('morgan')
   app.use(morgan('dev'))
}

app.use('/', routes)
app.use(errorHandler)