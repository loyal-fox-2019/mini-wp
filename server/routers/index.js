'use strict'

const express = require('express')
const articleRouter = require('./article')
const router = express.Router()
const memberRouter = require('./member')

router.use('/article', articleRouter)
router.use('/member', memberRouter)

module.exports = router