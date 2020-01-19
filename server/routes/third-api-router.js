const router = require('express').Router()
const ThirdAPIController = require('../controllers/third-api-controller')

router.post('/login-google', ThirdAPIController.loginGoogle)
router.post('/login-github', ThirdAPIController.loginGithub)
router.post('/login-twitter', ThirdAPIController.loginTwitter)

module.exports = router
