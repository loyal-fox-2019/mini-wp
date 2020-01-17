const router = require('express').Router()
const ArticleController = require('../controllers/article-controller')
const { authenticate, authorize } = require('../middlewares/auth')

router.get('/', ArticleController.getAllArticles)
router.get('/by-tag', ArticleController.getAllArticlesByTags)
router.use(authenticate)
router.post('/', ArticleController.createArticle)
router.use('/:articleId', authorize)
router.patch('/:articleId', ArticleController.editArticle)
router.delete('/:articleId', ArticleController.deleteArticle)

module.exports = router
