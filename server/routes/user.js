const express = require('express')
const router = express.Router()
const { UserController } = require('../controllers')
const { authentication } = require('../middlewares/auth')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/githubLogin', UserController.githubLogin)

router.use(authentication)
router.get('/profile', UserController.profile)
module.exports = router