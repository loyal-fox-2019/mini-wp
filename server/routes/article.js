const router = require('express').Router()
const ArticleController = require('../controllers/articleController')
const Upload = require('../middlewares/uploadImage')
const Authorization = require('../middlewares/authorization')
const Authentication = require('../middlewares/authenticate')

router.get('/', Authentication, ArticleController.getAll)
router.post('/', Authentication, Upload.single('featured_image'), ArticleController.postArticle)

router.delete('/:id', Authentication, Authorization, ArticleController.deleteArticle)
router.put('/:id', Authentication, Authorization, Upload.single('featured_image'), ArticleController.editArticle)

module.exports = router