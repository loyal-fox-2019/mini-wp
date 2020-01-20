require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
const cors = require('cors')
const Routes = require('./routes/index')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(`mongodb://localhost:27017/mini-wp`, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(()=> {
        console.log('===DATABASE CONNECTED===')
    })
    .catch(err => {
        console.log(err)
    })

app.use('/', Routes)

app.listen(PORT, function(){
    console.log(`this app listening on port ${PORT}`)
})
