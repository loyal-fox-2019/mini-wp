'use strict';

require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const router = require('./router/index');
const { ErrorHandler } = require('./middlewares/errorHandler');

mongoose
	.connect('mongodb://localhost/mini-wp', {
		useNewUrlParser    : true,
		useUnifiedTopology : true
	})
	.then(() => {
		console.log('masuk pak eko');
	})
	.catch(() => {
		console.log('error');
	});

app.use('/', router);
app.use(ErrorHandler);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
