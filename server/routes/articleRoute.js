const router = require('express').Router()
const articleController = require('../controllers/articleController')
const { authentication } = require('../middlewares/auth')
const { upload } = require('../middlewares/gcsUpload')

router.get('/',articleController.get)
router.use(authentication)
router.get('/tags/:tag',articleController.getTag)
router.get('/user',articleController.getUser)
router.put('/:id',articleController.update)
router.delete('/:id',articleController.delete)
router.post('/',upload.single('featured_image'),articleController.create)

module.exports = router