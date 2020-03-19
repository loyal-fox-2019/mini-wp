const express = require('express');
const app = express();
const port = 3000
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const mainRouter = require('./routes/index');

mongoose.connect('mongodb://localhost:27017/mini-wp', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        console.log('Connected to database');
    }).catch((err) => {
        console.log(err);
    });

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', mainRouter)

app.listen(port, () => {
    console.log('Listening on port : ' + port);
})
