const router = require('express').Router()
const usersRouter = require('./users')
const articlesRouter = require('./articles')
const { authentication } = require('../middlewares/auth')

router.get('/', function(req, res, next) {
  res.send('Welcome to Mini-WP!')
})

router.use('/users', usersRouter)
router.use(authentication)
router.use('/articles', articlesRouter)

module.exports = router;