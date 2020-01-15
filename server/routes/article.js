const router = require('express').Router()
const ArticleController = require('../controllers/article')
const { authentication, authorization } = require('../middlewares/auth')

router.get('/', ArticleController.getAllArticle)

router.get('/mine', authentication, ArticleController.getMyArticle)

router.get('/:id', ArticleController.showOneArticle)

router.post('/', authentication, ArticleController.createArticle)

router.put('/:id', authentication, authorization, ArticleController.editArticle)

router.delete('/:id', authentication, authorization, ArticleController.deleteArticle)

module.exports = router