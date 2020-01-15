const express = require('express')
const router = express.Router()
const article = require('../controllers/article-controller')
const upload = require('../midlleware/upload')



router.get('/', article.findall)
router.post('/',upload.single('image'),article.create)
router.delete('/:id', article.deleteArticle)
router.put('/:id',upload.single('image'),article.updateArticle)



module.exports= router