const routes = require('express').Router()
const AuthorController = require('../controllers/AuthorController')
const {authorAuthentication, authorTagAuthorization} = require('../middlewares/auth')

routes.post('/register', AuthorController.register)
routes.post('/login', AuthorController.login)
routes.get('/:id', authorAuthentication, authorTagAuthorization, AuthorController.getWatchedTags)
routes.patch('/:id', authorAuthentication, authorTagAuthorization, AuthorController.updateWatchedTags)

module.exports = routes