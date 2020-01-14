if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
const express = require('express'),
  app = express(),
  port = process.env.PORT,
  cors = require('cors'),
  routes = require('./routes')
  errorHandler = require('./middlewares/errorHandler')

require('./config/mongoose.js')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/', routes)
app.use(errorHandler)

app.listen(port, _=> console.log('Server running on port ', port))