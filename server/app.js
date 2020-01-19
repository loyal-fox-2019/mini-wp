if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mini-wp', {useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true});

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const router = require('./routes')

app.use('/', router)

app.use(require('./middlewares/errorHandler'))

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))