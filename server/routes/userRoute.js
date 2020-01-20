const router = require('express').Router()
const userController = require('../controllers/userController')
const { authentication } = require('../middlewares/auth')

router.post('/login',userController.login)
router.post('/register',userController.register)
router.post('/googleSignIn',userController.googleSignIn)
router.use(authentication)
router.put('/',userController.addTag)
router.get('/',userController.getUser)

module.exports = router