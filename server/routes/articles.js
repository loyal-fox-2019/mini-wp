'use strict'

const express = require('express')
const router = express.Router()
const { Article } = require('../controllers')
const authorization = require('../middlewares/authorization')

router.post('/', Article.createArticle)
router.get('/', Article.readUserArticle)
router.get('/all', Article.readAllArticle)
router.get('/search', Article.searchArticle)
router.get('/:id', Article.readOneArticle)
router.delete('/:id', authorization, Article.deleteArticle)
router.put('/:id', authorization, Article.updateArticle)

module.exports = router