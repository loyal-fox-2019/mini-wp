const router = require('express').Router(),
  userRoutes = require('./user'),
  articleRoutes = require('./article'),
  UserController = require('../controllers/user')

  router.post('/register', UserController.register)
  router.post('/login', UserController.login)
  router.post('/google', UserController.googleLogin)
  router.use('/users', userRoutes)
  router.use('/articles', articleRoutes)

module.exports = router
