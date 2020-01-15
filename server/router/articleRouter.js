const router = require('express').Router()
const ArticleController = require('../controller/ArticleController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')
// const tagCreation = require('../middleware/tagCreation') // hold mungkin bisa gk usah pake

router.get("/test", ArticleController.test)


router.use(authentication)
// ===========================================================
router.post('/', ArticleController.createArticle) //done
router.get('/all', ArticleController.findAll) //done
router.get('/filter', ArticleController.findAllFitleredArticles) //done


// admin tools
router.use('/admin', authorization('admin'))
// ===============================================================
router.delete('/admin/masterDelete', ArticleController.masterDelete) //done



router.use('/:articleId', authorization('article'))
// =======================================================================
router.patch('/:articleId', ArticleController.patchUpdateArticle)
router.delete('/:articleId', ArticleController.deleteArticle)

module.exports = router