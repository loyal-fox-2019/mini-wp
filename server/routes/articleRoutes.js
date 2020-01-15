const router = require('express').Router()
const ArticleController = require('../controllers/articleController')
// const authenticate = require('../helpers/')
const upload = require('../middlewares/gcsUpload')

router.get('/', ArticleController.findAll)
router.post('/',upload.single('picture'), ArticleController.create)
router.delete('/:id', ArticleController.delete)
router.patch('/:id',upload.single('picture'), ArticleController.update)
router.get('/:id', ArticleController.findOne)

module.exports = router