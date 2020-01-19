const router = require('express').Router()
const UserController = require('../controllers/usercontroller')
const upload = require('../middlewares/gcsUpload')

router.post('/register', upload.single('picture'), UserController.register)
router.post('/login', UserController.login)

module.exports = router