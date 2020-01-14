const express = require('express')
const router = express.Router()
const article = require('../controllers/article-controller')

router.get('/', article.findall)
router.post('/', article.create)
router.delete('/:id', article.deleteArticle)
router.put('/:id', article.updateArticle)



module.exports= router