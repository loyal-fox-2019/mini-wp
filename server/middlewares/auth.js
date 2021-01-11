const { decodeToken } = require('../helpers/jwt'),
  User = require('../models/user'),
  Article = require('../models/article')

function authenticate(req, res, next) {
  try {
    req.user = decodeToken(req.headers.token)
    User.findById(req.user._id)
      .then(user => {
        if(!user){
          next({status: 401, message: 'Authentication failed'})
        } else {
          next()
        }
      })
  } catch (error) {
    next(error)
  }
}

function authorize(req, res, next) {
  try {
    Article.findById(req.params.id)
      .then(article => {
        if(!article){
          next({status: 404, message: 'id not found'})
        } else if (article.author == req.user._id){
          next()
        } else {
          next({status: 401, message: 'Authorization failed'})
        }
      })
  } catch (error) {
    next(error)
  }
}

module.exports = { authenticate, authorize }
