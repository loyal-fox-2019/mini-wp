if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mini-wp', {useNewUrlParser: true,  useUnifiedTopology: true});

const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const router = require('./routes')
app.use('/', router)

app.listen(PORT, () => {
    console.log('listened port: '+ PORT)
})