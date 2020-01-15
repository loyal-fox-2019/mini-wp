'use strict';

const mongoose = require('mongoose');
// const uri = `mongodb://localhost:27017/mini-wp`;
const uri = `mongodb+srv://kirwanm:1v0TY56$@projects-og8m8.gcp.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(uri, {
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