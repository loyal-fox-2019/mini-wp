'use strict';

const jwt = require('jsonwebtoken')

class Jwt {
    static generateToken(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET);
    }

    static verifyToken(token) {
        return jwt.verify(token, process.env.JWT_SECRET);
    }
}

module.exports = Jwt;