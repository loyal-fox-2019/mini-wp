'use strict'

const express = require('express')
const router = express.Router()
const { Article } = require('../controllers')
const gcsUpload = require('gcs-upload')
const authorization = require('../middlewares/authorization')

const upload = gcsUpload({
  gcsConfig: {
    keyFilename: 'keyfile.json',
    bucketName: process.env.GOOGLE_CLOUD_BUCKET
  }
})

router.post('/', upload.single('image'), Article.createArticle)
router.get('/', Article.readUserArticle)
router.get('/all', Article.readAllArticle)
router.get('/search', Article.searchArticle)
router.get('/:id', Article.readOneArticle)
router.delete('/:id', authorization, Article.deleteArticle)
router.put('/:id', authorization, upload.single('image'), Article.updateArticle)

module.exports = router