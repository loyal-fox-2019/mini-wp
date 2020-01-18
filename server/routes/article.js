const router = require('express').Router()
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const ArticleController = require('../controllers/ArticleController')

router.get('/',ArticleController.getAll)
router.post('/', authentication, ArticleController.create)


router.get('/author', authentication, ArticleController.getAllByAuthor)
router.get('/:id', ArticleController.get)

router.put('/:id', [authentication, authorization], ArticleController.update)
router.delete('/:id', [authentication, authorization], ArticleController.delete)

router.get('/tag/:tag', ArticleController.getAllByTag)
router.get('/slug/:slug', ArticleController.getBySlug)

module.exports = router