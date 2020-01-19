const express = require('express')
const router = express.Router()
const ArticleController = require('../controllers/articleController')
const upload = require('../middlewares/gcsupload')
const authenticate = require('../middlewares/authentication')
const authorize = require('../middlewares/authorization')

router.use(authenticate)
router.get('/', ArticleController.findAll)
router.post('/', upload.single('picture'), ArticleController.create)
router.get('/:id', authorize, ArticleController.findOne)
router.patch('/:id', authorize, upload.single('picture'), ArticleController.update)
router.delete('/:id', authorize, ArticleController.delete)

module.exports = router