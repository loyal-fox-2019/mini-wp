const express = require('express')
const router = express.Router()
const { ArticleController } = require('../controllers')
const { authentication, authorization } = require('../middlewares/auth')

router.get('/', ArticleController.findAllArticles)
router.get('/:articleId', ArticleController.findOneArticle)

router.use(authentication)
router.post('/', ArticleController.addPost)
router.patch('/:articleId', authorization, ArticleController.updateArticle)
router.delete('/:articleId', authorization, ArticleController.deleteArticle)

module.exports = router