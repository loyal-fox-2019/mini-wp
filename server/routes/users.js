'use strict'

const express = require('express')
const router = express.Router()
const { User } = require('../controllers')
const authentication = require('../middlewares/authentication')

router.post('/login', User.login)
router.post('/register', User.register)
router.post('/gsign', User.oauthGoogle)
router.get('/cek', authentication, User.ceking)

module.exports = router