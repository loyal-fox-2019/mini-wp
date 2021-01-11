const router = require('express').Router()
const Article = require('./article')
const User = require('./user')

router.use('/article', Article)
router.use('/user', User)

module.exports = router
