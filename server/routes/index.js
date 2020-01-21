const router = require('express').Router()
const UserRouter = require('./user')
const ArticleRouter = require('./article')

router.use('/users', UserRouter)

router.use('/articles', ArticleRouter)

module.exports = router