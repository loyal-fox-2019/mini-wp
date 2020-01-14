'use strict';

const ArticleRouter = require('./ArticleRouter');
const router = require('express').Router();

router.use('/article', ArticleRouter);

module.exports = router;