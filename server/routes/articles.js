const router = require('express').Router()
const ArticleController = require('../controllers/ArticleController')
const { authenticate, authorize } = require('../middlewares/auth')
const gcsUpload = require('../middlewares/gcsUpload')


router.use(authenticate)
router.get('/', ArticleController.getAll)
router.get('/:id', ArticleController.getOne)
router.post('/', gcsUpload.single('image'), ArticleController.create)
router.put('/:id', authorize, ArticleController.edit)
router.delete('/:id', authorize, ArticleController.delete)
// router.get('/:username', ArticleController.getSelf)

module.exports = router