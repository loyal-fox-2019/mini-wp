'use strict';
const router = require('express').Router();
const user = require('./user');

router.get('/', (req, res, next) => res.status(200).json({ message: 'Server is running :)' }));
router.use('/user', user);

module.exports = router;