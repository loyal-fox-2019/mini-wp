const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.post('/signup', UserController.signUp)
router.post('/signin', UserController.signIn)
router.post('/googlesignin', UserController.googleSignIn)

module.exports = router