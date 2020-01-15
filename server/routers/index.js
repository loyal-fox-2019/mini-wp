'use strict'

const express = require('express')
const articleRouter = require('./article')
const router = express.Router()

router.use('/article', articleRouter)

module.exports = router