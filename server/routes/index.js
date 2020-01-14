const routes = require('express').Router()
const ArticleRoutes = require('./articleRoutes')
const AuthorRoutes = require('./authorRoutes')
const {singleUpload} = require('../services/imageUpload')

routes.post('/imgUpload', function(req, res, next) {
   singleUpload(req, res, (err) => {
      if(err) next(err)
      else {
         res.status(201).json({image: req.file.location})
      }
   })
})

routes.use('/author', AuthorRoutes)
routes.use('/article', ArticleRoutes)

module.exports = routes