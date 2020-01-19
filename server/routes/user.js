const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user');

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/oauth', UserController.googleOauth)

module.exports = router