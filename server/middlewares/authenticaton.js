const jwt = require('jsonwebtoken');
function authentication(req, res, next) {
    try {
        const token = req.headers.token
        req.userInfo = jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch (error) {
        res.json(401).json(error)
    }
}

module.exports = authentication
