const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.post('/signup', UserController.signUp)
router.post('/signin', UserController.signIn)
router.post('/googlesignin', UserController.googleSignIn)
// router.get('/', UserController.getAll)
// router.get('/:id', UserController.getOne)
// router.patch('/:id', UserController.update)
// router.delete('/:id', UserController.delete)

module.exports = router