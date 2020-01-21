const router = require('express').Router()
const article = require('./article')
const user = require('./user')
const errorHandler = require('../middlewares/errorHandler')

router.use('/', user)

router.use('/articles', article)

router.use(errorHandler)

module.exports = router