if (process.env.NODE_ENV === 'development') require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');
const errHandler = require('./middlewares/errHandler');
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
.then(() => console.log(`Connected to database: ${MONGO_URI}`))
.catch((err) => console.log(`Failed to connect to database, err: ${err}`));

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(routes);
app.use(errHandler);


module.exports = app;
