const router = require('express').Router()
const ArticleController = require('../controllers/articleController')
const authenticate = require('../middlewares/authentication')
const authorize = require('../middlewares/authorization')
const upload = require('../middlewares/gcsUpload')


router.use('/', authenticate)
router.get('/', ArticleController.findAll)
router.post('/',upload.single('picture'), ArticleController.create)
router.use('/:id', authorize)
router.delete('/:id', ArticleController.delete)
router.patch('/:id',upload.single('picture'), ArticleController.update)
router.get('/:id', ArticleController.findOne)

module.exports = router