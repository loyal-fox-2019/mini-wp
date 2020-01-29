'use strict'

const jwt = require('jsonwebtoken')

module.exports = function (req, res, next){
    const token = req.headers['authorization']
    const decode = jwt.verify(token, process.env.KEY_TOKEN)
    // console.log(token, 'ini d authentication')
    if(!decode) {
        throw ({status: 403, message: 'you dont have access to this site'})
    } else {
        req.user = decode.userId
        next()
    }
}