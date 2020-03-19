const userRouter = require('express').Router();
const { UserController } = require('../controllers/index');

userRouter.post('/register', UserController.create)
userRouter.post('/login', UserController.login)
userRouter.post('/g_sign_in', UserController.gSignIn)

module.exports = userRouter
