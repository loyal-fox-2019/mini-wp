const express = require('express')
const router = express.Router()
const errorHandler = require('../middlewares/errorHandler');
const user = require('./user');

// middleware that is specific to this router
router.use('/user', user)
// define the about route
router.use(errorHandler)

module.exports = router