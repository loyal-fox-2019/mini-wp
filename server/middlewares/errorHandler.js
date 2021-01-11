function errorHandler(err, req, res, next) {
  console.log(err)
  switch (err.name) {
      case 'ValidationError': {
          let message = []
          for (let key in err.errors) {
              message.push(err.errors[key].message)
          }
          res.status(400).json({ message })
      }
          break;
      case 'JsonWebTokenError': {
          let message = []
          if (err.message === 'invalid signature') {
              message.push('session is expired. Please login')
          } else if (err.message === 'jwt must be provided') {
              message.push('you have to login first')
          } else {
              message.push(err.message)
          }
          res.status(400).json({ message })
          break;
      }
      case 'MongoError': {
          let message = []
          for (let key in err.keyPattern) {
              message.push(key + ' already registered')
          }
          res.status(401).json({ message })
      }
          break;
      default:
          let status = err.status || 500
          let message = err.message || 'internal server error'
          res.status(status).json({ message })
  }
}

module.exports = errorHandler
