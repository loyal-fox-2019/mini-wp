'use strict';

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mini-wp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Mongodb connected ...');
})
.catch(err => {
    console.log('Mongodb fail to connect: ', err);
});

module.exports = mongoose;