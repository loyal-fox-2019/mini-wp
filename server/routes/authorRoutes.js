const routes = require('express').Router()
const AuthorController = require('../controllers/AuthorController')
const {authorAuthentication, authorUpdateTagAuthentication} = require('../middlewares/auth')

routes.post('/register', AuthorController.register)
routes.post('/login', AuthorController.login)
routes.patch('/:id', authorAuthentication, authorUpdateTagAuthentication, AuthorController.updateWatchedTags)

module.exports = routes