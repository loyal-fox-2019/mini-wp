const router = require('express').Router()
const controller = require('../controllers/articleController')

router.get('/', controller.getAllArticles)

router.post('/', controller.createArticle)

router.delete('/:id', controller.deleteArticle)

router.put('/:id', controller.updateArticle)

module.exports = router