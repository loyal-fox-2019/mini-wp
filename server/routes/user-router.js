const router = require('express').Router()
const ArticleController = require('../controllers/article-controller')
const { authenticate } = require('../middlewares/auth')

router.use(authenticate)
router.get('/articles', ArticleController.getUserArticles)

module.exports = router
