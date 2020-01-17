const router = require('express').Router()
const UserController = require('../controllers/usercontroller')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/gsignin', UserController.gsignin)

module.exports = router