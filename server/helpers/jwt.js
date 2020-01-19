const jwt = require('jsonwebtoken')

function generateToken(payload){
    const token = jwt.sign(payload, process.env.JWT_KEY);
    return token
}

function decodeToken(token){
    // console.log(token)
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    return decoded
}

module.exports = {
    generateToken,
    decodeToken
}