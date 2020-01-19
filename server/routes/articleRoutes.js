const routes = require('express').Router()
const ArticleController = require('../controllers/ArticleController')
const {authorAuthentication, authorReadAuthorization, authorUpdateDeleteAuthorization} = require('../middlewares/auth')

routes.use(authorAuthentication)
routes.post('/', ArticleController.create)
routes.get('/', ArticleController.read)
routes.get('/tag/:tag', ArticleController.readByTag)
routes.get('/:articleId', authorReadAuthorization, ArticleController.readDetail)
routes.patch('/:articleId', authorUpdateDeleteAuthorization, ArticleController.updateOne)
routes.delete('/:articleId', authorUpdateDeleteAuthorization, ArticleController.deleteOne)

module.exports = routes