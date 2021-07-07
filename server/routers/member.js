'use strict'

const express = require('express')
const router = express.Router()
const memberController = require('../controllers/member')

router.post('/register', memberController.signUp)
router.post('/login', memberController.signIn)

module.exports = router