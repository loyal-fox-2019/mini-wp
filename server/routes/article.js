const router = require('express').Router()
const controller = require('../controllers/articleController')
const upload = require('../middlewares/gcsUpload')


router.get('/', controller.getAllArticles)

router.post('/',upload.single('image_url'), controller.createArticle)

router.delete('/:id', controller.deleteArticle)

router.put('/:id',upload.single('image_url') , controller.updateArticle)

module.exports = router