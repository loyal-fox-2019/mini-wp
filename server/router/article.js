'use strict'

const router = require('express').Router()

const ArticleController = require('../controller/articleController')
const authentication = require('../middleware/authentication')
const { ownArticle } = require('../middleware/authorization')

const upload = require('../helpers/gcsupload')

router.use(authentication)
router.post('/', upload.single('featured_image'), ArticleController.createArticle)
router.patch('/:articleID', ownArticle)
router.patch('/:articleID', ArticleController.editActicle)
router.delete('/:articleID', ArticleController.deleteArticle)

module.exports = router