const router = require('express').Router()
const PostController = require('../controllers/PostController')
const upload = require('../middlewares/UploadImage')
router.get('/', PostController.getAll)
router.post('/', upload.single('image'), PostController.create)
router.get('/:id', PostController.get)
router.put('/:id', upload.single('image'), PostController.update)
router.delete('/:id', PostController.delete)

module.exports = router