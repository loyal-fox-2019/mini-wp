const jwt = require('jsonwebtoken')

module.exports = (err, req, res, next) => {
    const token = req.headers.token
    try {
        let payload = jwt.verify(token, process.env.JWT_SECRET)
        req.loggedIn = payload
        next()
    }
    catch(err) {
        res.status(500).json(err)
    }
}