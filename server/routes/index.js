const router = require('express').Router()
const UserController = require('../controllers/user-controller')
const articleRouter = require('./article-router')
const userRouter = require('./user-router')
const thirdApiRouter = require('./third-api-router')

router.get('/', function(req, res, next) {
  res.json({ message: 'Server alive!' })
})
router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.use('/third-api', thirdApiRouter)
router.use('/articles', articleRouter)
router.use('/users', userRouter)

module.exports = router
