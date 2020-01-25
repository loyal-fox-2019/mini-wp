'use strict';

var express = require('express');
var router = express.Router();

const articleRouter = require('../router/article');
const userRouter = require('../router/user');

router.use('/article', articleRouter);
router.use('/', userRouter);

module.exports = router;
