const router = require('express').Router()
const UserController = require('../controller/UserController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

router.get('/test', UserController.test)
router.post('/bulkFind', UserController.bulkFind) //TEST DOANG //SUCCESS

router.post('/registration', UserController.registration) //done
router.post('/login', UserController.login) //done



router.use(authentication)
// admin tools
router.use('/admin', authorization('admin'))
// ===============================================================
router.get('/admin/', UserController.findAll) //done
router.delete('/admin/:userId', UserController.findOneUserDelete) //done
router.delete('/admin/masterDelete', UserController.masterDelete) //done

module.exports = router