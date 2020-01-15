const router = require('express').Router()
const Controller = require('../controller/articles')
const upload = require('../middlewares/upload')

router.get('/', Controller.findAll)
router.post('/', upload.single('file'), Controller.create)
router.delete('/:id', Controller.delete)
router.put('/:id', Controller.updateAll)
router.patch('/:id', Controller.updateArticle)
router.get('/:id', Controller.findById)

module.exports = router
