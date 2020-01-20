const router = require('express').Router()
const Controller = require('../controllers/article')
const auth = require('../middlewares/authorization')
const upload = require('../middlewares/upload-gcs')

router.post('/', upload.single('thumbnail'), Controller.addArticle)
router.get('/', Controller.articleByAuthorId)
router.get('/all', Controller.allArticle)
router.get('/:id', auth, Controller.findArticleById)
router.put('/:id', auth, Controller.updateArticle)
router.delete('/:id', auth, Controller.deleteArticle)

module.exports = router