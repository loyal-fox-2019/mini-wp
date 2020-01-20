const routes = require('express').Router()
const controlArticle = require('../controller/controlArticle')
const upload = require('../middleware/uploadGCS')
const controlUser = require('../controller/controlUser')
const authenticate = require('../middleware/authentication')
const authorize = require('../middleware/authorize')

routes.post('/google', controlUser.google)
routes.post('/register', controlUser.register)
routes.get('/allUser', controlUser.allUser)
routes.post('/login', controlUser.login)
routes.get('/title/:title', controlArticle.getArticleByTitle)
routes.post('/publish', authenticate, authorize.toCreate, upload.single('file'), controlArticle.publishArticle)
routes.get('/myArticles', authenticate, controlArticle.myArticles)
routes.get('/allArticles', controlArticle.allArticles)
routes.get('/article/:id', controlArticle.getArticleById)
routes.put('/editArticle/:id', authenticate, authorize.toEditAndDelete, upload.single('file'), controlArticle.editArticle)
routes.delete('/delete/:id', authenticate, authorize.toEditAndDelete, controlArticle.deleteArticle)

// routes.post('/', upload.single('file'), controlArticle.publishArticle)

// routes.put('/edit/:id', controlArticle.editArticle)
// routes.delete('/delete/:id', controlArticle.deleteArticle)

module.exports = routes
