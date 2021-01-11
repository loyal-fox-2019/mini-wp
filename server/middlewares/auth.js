const Article = require('../models/Article')
const User = require('../models/User')
const {verify} = require('../helpers/token')

class Auth{
  static authenticate(req, res, next){
    try{
      let token = verify(req.headers.access_token)
      User.findById(token.userId)
        .then((data) => {
          if (data){
            req.userId = token.userId
            next()
          }
          else {
            throw {code: 400, message: 'Please login first'}
          }
        })
    }
    catch(err){
      next(err)
    }
  }
  static authorize(req, res, next){
    Article.findOne({
      _id: req.params.id
    })
      .then((data) => {
        if (data.author == req.userId){
          next()
        }
        else {
          throw {code: 401, message: 'You are not authorized'}
        }
      })
      .catch((err) => {
        next(err)
      })
  }
}

module.exports = Auth