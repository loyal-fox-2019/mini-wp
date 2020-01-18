const router = require('express').Router()
const ArticleController = require('../controllers/articleController')
const Upload = require('../middlewares/uploadImage')
const Authorization = require('../middlewares/authorization')
const Authentication = require('../middlewares/authenticate')

router.use(Authentication)
router.get('/', ArticleController.getAll)
router.post('/', Upload.single('image'), ArticleController.postArticle)

router.use(Authorization)
router.delete('/:id', ArticleController.deleteArticle)
router.put('/:id', Upload.single('image'), ArticleController.editArticle)

module.exports = router