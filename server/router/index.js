const express = require('express')
const router = express.Router()
const article = require('./article-router')
const user = require('./user-router')


router.use('/articles',article)
router.use('/users', user)




module.exports = router