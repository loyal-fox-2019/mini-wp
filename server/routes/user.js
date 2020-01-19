const router = require('express').Router()
const controller = require('../controllers/userController')

// router.post('/googleSign', controller.googleLogin)

router.post('/', controller.register)

router.post('/signIn', controller.login)

module.exports = router