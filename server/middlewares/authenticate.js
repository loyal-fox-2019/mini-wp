const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.headers.token
    try {
        let payload = jwt.verify(token, process.env.JWT_SECRET)
        req.loggedIn = payload
        // console.log(payload)
        next()
    }
    catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
}