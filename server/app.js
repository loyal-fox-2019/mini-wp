const express = require('express')
const app = express()
const PORT = 3000
const routes = require('./routes/index')
const mongoose = require('mongoose')
const cors = require('cors')

app.use(cors())

mongoose.connect('mongodb://localhost:27017/mini-wp', {useNewUrlParser: true, useUnifiedTopology:true})
.then(success=>{
    console.log(`connected to mini-wp on mongoDB`)
})
.catch(err=>{
    console.log(err)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', routes)

app.listen(PORT, () => {
    console.log(`Mini WP app listening on PORT : ${PORT}`)
})