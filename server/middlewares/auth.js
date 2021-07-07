const { verifyToken } = require('../helpers/jwt')
const User = require('../models/User')
const Article = require('../models/article')

module.exports = {
  async authenticate(req, res, next) {
    try {
      let { id } = verifyToken(req.headers.token)
      let user = await User.findById(id)
      if(user) {
        req.decodedId = id
        next()
      } else {
        next({status: 401, message: 'Authentication failed'})
      }
    } catch (error) {
      next(error)
    }
  },
  async authorize(req, res, next) {
    try {
      let article = await Article.findById(req.params.id)
      if (article) {
        if (article.author == req.decodedId) next()
        else next({status: 401, message: 'You are not authorized!'})
      } else {
        next({status: 404, message: 'Article is not found!'})
      }
    } catch (error) {
      next(error)
    }
  }
}