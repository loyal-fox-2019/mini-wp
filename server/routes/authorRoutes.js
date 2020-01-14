const routes = require('express').Router()
const AuthorController = require('../controllers/AuthorController')

routes.post('/register', AuthorController.register)
routes.post('/login', AuthorController.login)
routes.get('/nopenopenope', AuthorController.read)

module.exports = routes