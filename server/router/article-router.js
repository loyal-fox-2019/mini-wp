const express = require('express')
const router = express.Router()
const article = require('../controllers/article-controller')
const upload = require('../midlleware/upload')
const verif = require('../midlleware/verif')
const err = require('../midlleware/errorhandle')


router.use(verif.Authen)
router.get('/', article.findall)
router.post('/',upload.single('image'),article.create)

router.use('/:id', verif.author)
router.delete('/:id', article.deleteArticle)
router.put('/:id',upload.single('image'),article.updateArticle)
router.use(err.err)



module.exports= router