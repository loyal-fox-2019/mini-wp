const router = require('express').Router()
const ArticleController = require('../controllers/articleController')

router.get('/article', ArticleController.getAll)
router.post('/article', ArticleController.postArticle)
router.delete('/article/:id', ArticleController.deleteArticle)

module.exports = router