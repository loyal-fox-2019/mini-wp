'use strict'

const jwt = require('jsonwebtoken')

const authentication = (req, res, next) => {
    const { access_token } = req.headers
    try {
        req.userSignedIn = jwt.verify(access_token, process.env.JWT_SECRET)
    } catch (err) {
        next(err)
    }
    next()
}

module.exports = authentication