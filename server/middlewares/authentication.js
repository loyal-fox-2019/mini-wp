const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Ambil token
    const { token } = req.headers;
    // Jika token ada, berarti pula sudah login
    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        User.findById(decoded._id)
        .then((user) => {
            // Jika user ada
            if (!user) {
                next({ auth: true, status: 400, message: 'Token invalid' })
            }
            // Jika user tidak ada
            else {
                req.decoded = decoded;
                next();
            }
        })
    }
    // Jika token tidak ada, berarti pula belum login
    else {
        next({ auth: true, status: 401, message: 'You have to login' });
    }
}