const router = require('express').Router()
const UserController = require('../controller/UserController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')
const upload = require('../helper/gcsUpload')
const gVerify = require('../middleware/gSignIn')

// testing
// ============================================================
router.get('/test', UserController.test)
router.post('/bulkFind', UserController.bulkFind) //TEST DOANG //SUCCESS


// no authentication && no authorization
// ============================================================
router.post('/registration', UserController.registration) //done
router.post('/login', UserController.login) //done
router.post('/gsignin', gVerify, UserController.googleSignIn)

router.use(authentication)
router.get('/one/:userId', UserController.findByUserId)

// admin tools
router.use('/admin', authorization('admin'))
// ===============================================================
router.get('/admin/', UserController.findAll) //done
router.delete('/admin/:userId', UserController.findOneUserDelete) //done
router.delete('/admin/masterDelete', UserController.masterDelete) //done



router.use('/:userId', authorization('User'))
// ==============================================================
router.patch('/:userId', authorization('User'), upload.single('file'), UserController.patchUpdate)


// no authorization
// ==================================================================
router.get('/', UserController.findLoggedInUserDetail)
module.exports = router
