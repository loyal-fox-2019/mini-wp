'use strict';


require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const mongoose = require('mongoose');
const article = require('./routes/article');
const errorHandler = require('./middleware/errorHandler');

mongoose.connect('mongodb+srv://rafaelhrhp:b1625nfb@mini-wp-nxpmp.gcp.mongodb.net/mini-wp?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}, function() {
    console.log('Connected to MongoDB');
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/article', article);

app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`App listengin on PORT: ${PORT}`)
})