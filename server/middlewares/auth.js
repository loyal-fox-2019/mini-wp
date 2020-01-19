const { verifyToken } = require('../helpers/jwt')

function authentication ( req,res,next ) {
    if( req.headers.token ) {
        let decoded = verifyToken( req.headers.token )

        if( decoded.id ) {
            req.decoded = decoded
            next()
        } else {
            next( { code: 401, message: 'You are not authorized' } )
        }
    } else {
        next( { code: 401, message: 'Token required' } )
    }
}

module.exports = { authentication }