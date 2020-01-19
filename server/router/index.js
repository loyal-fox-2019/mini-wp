const router = require('express').Router()
const user = require('./user')
const article = require('./article')
const Authentication = require('../middlewares/authentication')

router.use('/users', user)

router.use(Authentication)
router.use('/articles', article)

module.exports = router