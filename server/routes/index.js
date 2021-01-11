"use strict"

const express = require('express');
const router = express.Router();
const articleRoute = require('./article');

router.use('/articles', articleRoute);

module.exports = router;