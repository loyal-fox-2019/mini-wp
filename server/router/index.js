'use strict'

const router = require('express').Router()

const userRouter = require('./user')
const articleRouter = require('./article');

const userController = require('../controller/userController')


router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/googleSignIn', userController.googleSignIn)
router.use('/users', userRouter)
router.use('/articles', articleRouter)

module.exports = router