const express = require('express')
const router = express.Router()
const ArticleController = require('../controllers/articleController')
const upload = require('../middlewares/gcsupload')

router.get('/', ArticleController.findAll)
router.post('/', upload.single('picture'), ArticleController.create)
router.patch('/:id', upload.single('picture'), ArticleController.update)
router.delete('/:id', ArticleController.delete)

module.exports = router