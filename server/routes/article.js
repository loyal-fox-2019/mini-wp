const router = require('express').Router(),
  ArticleController = require('../controllers/article'),
  { authenticate, authorize } = require('../middlewares/auth'),
  upload = require('../middlewares/gcsUpload')

router.get('/', ArticleController.all)
router.use(authenticate)
router.get('/user', ArticleController.userArticles)
router.post('/', upload.single('featured_image'), ArticleController.create)
router.delete('/:id', authorize, ArticleController.delete)
router.put('/:id', authorize, upload.single('featured_image'), ArticleController.update)
router.patch('/:id/addTags', authorize, ArticleController.addTags)
router.patch('/:id/removeTag', authorize, ArticleController.removeTag)

module.exports = router