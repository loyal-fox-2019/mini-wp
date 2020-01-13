'use strict'

const router = require('express').Router()
const usersController = require('../controllers/usersController')
const { authentication } = require('../middlewares/auth')

router.get('/:id', authentication, usersController.findOne)
router.post('/register', usersController.register)
router.post('/signin', usersController.signIn)
router.post('/googlesiginin', usersController.googleSignIn)

module.exports = router;