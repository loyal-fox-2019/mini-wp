const Article = require('../models/article')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

module.exports = {
  authenticate: function(req, res, next) {
    if (!req.headers.token) {
      return next({ name: 'BadRequest', message: 'Token is missing' })
    }

    try {
      const payload = jwt.verify(req.headers.token, process.env.JWT_SECRET)
      User.findOne({ _id: payload.id })
        .then(user => {
          if (!user) {
            throw { name: 'BadRequest', message: 'Bad token' }
          }
          req.payload = payload
          next()
        })
        .catch(next)
    } catch (err) {
      next(err)
    }
  },
  authorize: function(req, res, next) {
    Article.findOne({ _id: req.params.articleId })
      .then(article => {
        if (!article) {
          throw { name: 'NotFound', message: 'Article not found' }
        }

        if (article.author != req.payload.id) {
          throw { name: 'NotAuthorized', message: 'You are not authorized' }
        }

        req.article = article
        next()
      })
      .catch(next)
  },
}
