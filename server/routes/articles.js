const router = require('express').Router()
const ArticleController = require('../controllers/ArticleController')
const { authenticate, authorize } = require('../middlewares/auth')
const gcsUpload = require('../middlewares/gcsUpload')

router.get('/', ArticleController.getAll)
router.get('/:id', ArticleController.getOne)

router.use(authenticate)
router.post('/', gcsUpload.single('image'), ArticleController.create)
router.get('/:username', ArticleController.getSelf)
router.put('/:id', authorize, ArticleController.edit)
router.delete('/:id', authorize, ArticleController.delete)

module.exports = router