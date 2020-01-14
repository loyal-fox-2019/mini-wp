const express = require('express')
const router = express.Router()
const article = require('./article-router')


router.use('/articles', article)




module.exports = router