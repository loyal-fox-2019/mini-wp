const router = require('express').Router()
const ArticleController = require('../controllers/article')
const { authentication, authorization } = require('../middlewares/auth')
const upload = require('../helpers/gcs')


router.get('/', ArticleController.getAllArticle)

router.get('/mine', authentication, ArticleController.getMyArticle)

router.get('/:id', ArticleController.showOneArticle)

router.post('/', authentication, upload.single('image'), ArticleController.createArticle)

router.patch('/:id', authentication, authorization, ArticleController.editArticle)

router.delete('/:id', authentication, authorization, ArticleController.deleteArticle)

module.exports = router