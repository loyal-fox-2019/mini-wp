const router = require('express').Router()
const usersRouter = require('./users')
const articlesRouter = require('./articles')

router.use('/', usersRouter)
router.use('/articles', articlesRouter)

module.exports = router