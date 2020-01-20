'use strict'

const router = require('express').Router()

const ArticleController = require('../controller/articleController')
const authentication = require('../middleware/authentication')
const { ownArticle } = require('../middleware/authorization')

const upload = require('../helpers/gcsupload')


router.use(authentication)
router.post('/', upload.single('featured_image'), ArticleController.createArticle)
router.get('/:articleID', ownArticle, ArticleController.getDetail)
router.get('/tag/:keywordTag', )
router.patch('/:articleID', ownArticle, ArticleController.editActicle)
router.delete('/:articleID', ownArticle, ArticleController.deleteArticle)

module.exports = router