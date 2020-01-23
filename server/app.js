if (process.env.NODE_ENV === 'development') require('dotenv').config()

const express = require('express')
const app = express()
const morgan = require('morgan')
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')

const cors = require('cors')
const routes = require('./routes/index')

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('connected to db')
  })
  .catch(err => {
    console.log(err)
  })

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/', routes)

const errHandler = require('./errHandler')
app.use(errHandler)
// app.use((req, res, next) => {
//     const err = {
//         message: 'Page Not Found',
//         status: 404
//     }
//     next(err)
// })
// app.use((err, req, res, next) => {
//     res.status(err.status || 500)
//     res.json({
//         error: {
//             message: err.message
//         }
//     })
// })

app.listen(PORT, () => {
  console.log(`you are now in PORT ${PORT}`)
})
