function generateToken(userData) {
    const jwt = require('jsonwebtoken');
    const token = jwt.sign(userData, process.env.JWT_SECRET);
    return token
}

module.exports = generateToken
