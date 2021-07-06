'use strict';
const router = require('express').Router();
const user = require('./user');
const articles = require('./article');

router.get('/', (req, res, next) => res.status(200).json({ message: 'Server is running :)' }));
router.use('/user', user);
router.use('/articles', articles);

module.exports = router;