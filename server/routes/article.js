const router = require('express').Router(),
  ArticleController = require('../controllers/article'),
  { authenticate, authorize } = require('../middlewares/auth')

router.get('/', ArticleController.all)
router.use(authenticate)
router.post('/', ArticleController.create)
router.delete('/:id', authorize, ArticleController.delete)
router.put('/:id', authorize, ArticleController.update)
router.patch('/:id/addTags', authorize, ArticleController.addTags)
router.patch('/:id/removeTag', authorize, ArticleController.removeTag)

module.exports = router