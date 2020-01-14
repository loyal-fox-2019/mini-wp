"use strict"

require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/miniWp', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
.then(() => {
    console.log('mongoose connected!');
})
.catch((err) => {
    console.log(err);
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);

app.listen(PORT, () => console.log(`app listening on port ${PORT}!`));