const router = require('express').Router()
const ArticleController = require('../controllers/ArticleController')
const { authenticate, authorize } = require('../middlewares/auth')
const upload = require('../middlewares/gcsUpload')

router.use(authenticate)
router.get('/', ArticleController.showAll)
router.get('/tags/:tags', ArticleController.searchTag)
router.post('/', upload.single('file'), ArticleController.create)

router.use('/:id', authorize)
router.get('/:id', ArticleController.showOne)
router.patch('/:id', upload.single('file'), ArticleController.edit)
router.delete('/:id', ArticleController.remove)


module.exports = router