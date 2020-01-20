'use strict'

const User = require('../models/user')
const Article = require('../models/article')
const { verifyToken } = require('../helpers/jwt')

module.exports = {
  authentication(req, res, next) {
    if (req.headers.hasOwnProperty('access_token')) {
      try {
        req.decoded = verifyToken(req.headers.access_token)
        User.findById(req.decoded.id)
          .then(user => {
            if (user) {
              next()
            } else {
              next({ status: 400, message: 'Invalid access' })
            }
          })
          .catch(next)
      } catch(err) {
        next(err)
      }
    } else {
      next({ status: 401, message: 'You must log in first'})
    }
  },

  authorization(req, res, next) {
    Article.findById(req.params.id)
      .then(article => {
        if (article) {
          if (String(article.author) === req.decoded.id) {
            next()
          } else {
            next({ status: 403, message: 'Unauthorized process!' })
          }
        } else {
          next({ status: 404, message: 'Article not found!' })
        }
      })
      .catch(next)
  }
}