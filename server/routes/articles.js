'use strict'

const router = require('express').Router()
const articlesController = require('../controllers/articlesController')
const { authorization } = require('../middlewares/auth')
const { multer, sendUploadToGCS } = require('../middlewares/gcs')

router.post('/',
  multer.single("image"),
  sendUploadToGCS,
  articlesController.create
)
router.get('/', articlesController.findAll)
router.get('/:id', articlesController.findOne)
router.post('/tags', articlesController.createTags)
router.patch('/:id/likes', articlesController.like)
router.post('/:id/comments', articlesController.addComment)
router.get('/all/own', articlesController.findMine)
router.get('/all/bookmarks', articlesController.findBookmarks)
router.get('/filter/:tag', articlesController.filter)
router.get('/search/:title', articlesController.search)

router.use('/:id', authorization)
router.put('/:id',
  multer.single("image"),
  sendUploadToGCS,
  articlesController.edit
) 
router.delete('/:id', articlesController.destroy)
router.post('/:id/pdf', articlesController.print)

module.exports = router;