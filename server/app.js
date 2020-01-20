const express = require('express');
const app = express()
const PORT = 3000
const cors = require('cors');
const route = require('./routes/index');

// if (process.env.NODE_ENV === 'development') 
require('dotenv').config();

let mongoose = require('mongoose');
let mongoDB = 'mongodb+srv://JPetra:15081997@mini-wp-158z1.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, 
    useCreateIndex: true,
    useFindAndModify: false
})
.then(response =>{
        console.log("connected to mongo atlas!")
})
.catch(err => {
    console.log(err)
});
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())

app.use('/',route)

app.listen(PORT, ()=> console.log(`listening to port ${PORT}`))