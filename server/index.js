require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { articleRouter } = require('./routes');
const { handleError } = require('./helpers');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.DB_NAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // routes
    app.use('/articles', articleRouter);

    // error handler
    app.use(handleError);

    app.listen(PORT, () => console.log(`Mini WordPress listening at ${PORT}`));
  })
  .catch(err => console.error(err));
