'use strict';

const jwt = require('jsonwebtoken')

class Jwt {
    static generateToken(payload) {
        return jwt.sign(payload, '')
    }
}

module.exports = Jwt;