'use strict'

const express = require('express')
const router = express.Router()
const authentication = require('../middlewares/authentication')
const userController = require('./users')
const articleController = require('./articles')

router.use('/users', userController)
router.use(authentication)
router.use('/articles', articleController)

module.exports = router