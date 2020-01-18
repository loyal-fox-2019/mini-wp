const router = require('express').Router()
const article = require('./article')
const user = require('./user')

router.use('/', user)

router.use('/articles', article)

module.exports = router