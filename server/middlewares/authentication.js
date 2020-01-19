const { verifyToken } = require('../helpers/jwt')

module.exports = (req, res, next) => {
    let err = {
        name: 'Token Validation',
        message: 'Invalid Token'
    }
    if (req.headers.token) {
        try {
            let payload = verifyToken(req.headers.token)
            req.loginData = payload
            next()
        }
        catch (err) {
            err.name = 'Token Validation'
            err.message = 'Invalid Token'
            next(err)
        }
    } else {
        err.name = 'Unauthorized'
        err.message = 'Authentication Required'
        next(err)
    }
}