const router = require('express').Router()
const controller = require('../controllers/userController')

router.post('/googleSign', controller.googleLogin)

module.exports = router