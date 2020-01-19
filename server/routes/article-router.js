const router = require('express').Router()
const ArticleController = require('../controllers/article-controller')
const { authenticate, authorize } = require('../middlewares/auth')

const gcsUpload = require('gcs-upload')
const uploadImage = gcsUpload({
  limits: {
    fileSize: 0.5e7, // in bytes => 5MB
  },
  gcsConfig: {
    keyFilename: process.env.KEY_FILENAME,
    bucketName: process.env.BUCKET_NAME,
  },
})

router.get('/', ArticleController.getAllArticles)
router.get('/by-tag', ArticleController.getAllArticlesByTags)
router.use(authenticate)
router.post('/', uploadImage.single('featuredImage'), ArticleController.createArticle)
router.use('/:articleId', authorize)
router.patch('/:articleId', ArticleController.editArticle)
router.delete('/:articleId', ArticleController.deleteArticle)

module.exports = router
