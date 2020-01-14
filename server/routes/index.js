const routes = require('express').Router()
const ArticleRoutes = require('./articleRoutes')
const AuthorRoutes = require('./authorRoutes')

routes.use('/author', AuthorRoutes)
routes.use('/article', ArticleRoutes)

module.exports = routes