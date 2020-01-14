const express = require('express')
const router = express.Router()
const ArticleController = require('../controllers/articleController')

router.get('/', ArticleController.findAll)
router.post('/', ArticleController.create)
router.patch('/:id', ArticleController.update)
router.delete('/:id', ArticleController.delete)

module.exports = router