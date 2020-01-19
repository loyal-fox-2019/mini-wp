const router = require('express').Router()
const controller = require('../controllers/articleController')
const upload = require('../middlewares/gcsUpload')
const authentication = require('../middlewares/authentication')

router.use(authentication)

router.get('/', controller.getAllArticles)

router.get('/myArticles', controller.findMyArticles)

router.post('/',upload.single('image_url'), controller.createArticle)

router.delete('/:id', controller.deleteArticle)

router.put('/:id',upload.single('image_url') , controller.updateArticle)

module.exports = router