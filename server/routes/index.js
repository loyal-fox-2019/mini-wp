const express = require('express')
const router = express.Router()
const errorHandler = require('../middlewares/errorHandler');
const authentication = require('../middlewares/authentication');
const user = require('./user');
const article = require('./article');

router.use('/user', user);

router.use('/articles', authentication);
router.use('/articles', article);
router.use(errorHandler);

module.exports = router;