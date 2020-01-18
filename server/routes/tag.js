const router = require('express').Router()
const authentication = require('../middlewares/authentication')
const TagController = require('../controllers/TagController')
router.use('/', authentication)
router.get('/', TagController.getAll)
router.post('/', TagController.create)
router.post('/bulkinsert', TagController.bulkCreate)
router.get('/:id', TagController.get)
router.put('/:id', TagController.update)
router.delete('/:id', TagController.delete)

module.exports = router