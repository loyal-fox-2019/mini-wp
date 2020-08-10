require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { articleRouter, userRouter } = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB successfully connected!'))
  .catch(err => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', userRouter);
app.use('/articles', articleRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || res.statusCode;
  const message = err.message.toString();

  if (statusCode) {
    res.status(statusCode).json({ message });
  } else {
    res.status(500).json({ message: `Internal server error!` });
  }
});

app.listen(PORT, () => console.log(`Mini WP listening at port ${PORT}`));
