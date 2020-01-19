if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const routes = require('./routes')
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded
mongoose.connect('mongodb://localhost:27017/mini-wp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.use('/', routes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));