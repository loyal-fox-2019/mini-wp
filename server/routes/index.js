const router = require('express').Router()
const userController = require('../controllers/UserController')
const articleController = require('../controllers/ArticleController');
const authentication = require('../middlewares/authentication')
const gcs = require('../middlewares/gcs');

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('findOneUser', userController.findOne)
router.get('/findAllArticle', articleController.findAllArticle)
router.get('/findUserArticle', authentication, articleController.findUserArticle)
router.post('/createArticle', authentication, gcs.single('file'), articleController.createArticle)
router.patch('/editArticle/:articleId', articleController.editArticle)
router.get('/findOne/:articleId', articleController.findOne)




module.exports = router