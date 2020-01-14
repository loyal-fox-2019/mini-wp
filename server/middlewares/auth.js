const { verifyToken } = require('../helpers/jwt')
const User = require('../models/User')

module.exports = {
  async authenticate(req, res, next) {
    try {
      let decodedId = verifyToken('req.headers.token')
      let user = await User.findById(decodedId)
      if(user) {
        req.decodedId = decodedId
        next()
      } else {
        next({status: 401, message: 'Authentication failed'})
      }
    } catch (error) {
      next(error)
    }
  }
}