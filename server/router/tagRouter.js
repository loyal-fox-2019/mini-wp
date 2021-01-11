const router = require('express').Router()
const TagController = require('../controller/TagController')


// admin tools
router.get('/test', TagController.test)
router.get('/adminAll', TagController.findAll)
router.delete('/masterDelete', TagController.masterDelete)


module.exports = router