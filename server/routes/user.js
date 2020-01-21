const router = require('express').Router()
const controller = require('../controllers/userController')

router.post('/', controller.register)

router.post('/signIn', controller.login)

router.post('/googleSignIn', controller.googleSign)

module.exports = router