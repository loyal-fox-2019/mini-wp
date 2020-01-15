const router = require('express').Router()
const ArticleController = require('../controllers/articleController')
const Upload = require('../middlewares/uploadImage')

router.get('/article', ArticleController.getAll)
router.post('/article', Upload.single('image'), ArticleController.postArticle)
router.delete('/article/:id', ArticleController.deleteArticle)
router.put('/article/:id', Upload.single('image'), ArticleController.editArticle)

module.exports = router