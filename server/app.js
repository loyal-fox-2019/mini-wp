require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
const cors = require('cors')
const Routes = require('./routes/article')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(`mongodb+srv://ilhammarzlik:${process.env.MONGO_PASS}@clusterzero-2cc7x.mongodb.net/test?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})
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
