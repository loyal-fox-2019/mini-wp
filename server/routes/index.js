const router = require('express').Router()
const Article = require('./article')
const User = require('./user')

router.use('/', Article)
router.use('/user', User)

module.exports = router
