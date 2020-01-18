const router = require('express').Router()
const UserController = require('../controllers/user')
const {authentication} = require('../middlewares/auth')

router.get('/all', UserController.allUser)

router.get('/', authentication, UserController.getUserData)

router.post('/login', UserController.login)

router.post('/register', UserController.register)

module.exports = router