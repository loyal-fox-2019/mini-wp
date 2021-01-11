const router = require('express').Router()
const UserController = require('../controllers/usercontroller')

router.post('/', UserController.gsignin)

module.exports = router