if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')
const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.listen(PORT, ()=>{
    console.log(`Listening on PORT ${PORT}`);
})

mongoose.connect(process.env.MONGOOSE, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
.then(()=>{
    console.log('Connected to database');
})
.catch(err=>{
    console.log(err);
})

app.use('/', routes)
app.use(errorHandler)