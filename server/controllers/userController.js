const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { comparePassword } = require('../helpers/bcrypt');

class userController {
    static async register(req, res, next) {
        // Registration Data
        const { email, password } = req.body;
        const userData = {
            email,
            password
        };
        // Try registration
        try {
            const userCredential = await User.create(userData);
            const { _id, name, email } = userCredential;
            const payload = {
                _id,
                email,
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET);
            res.status(201);
            res.json({name, token, id:_id})
        } catch (error) {
            next(error)
        }
    }

    static login(req, res, next) {
        const { email, password } = req.body;
        User.findOne({ email })
        .then((user) => {
            // jika user ada
            if (user) {
                // jika password benar
                if (comparePassword(password, user.password)) {
                    const { email, _id } = user;
                    const payload = {
                        email,
                        _id,
                    }
                    const token = jwt.sign(payload, process.env.JWT_SECRET);
                    res.status(202);
                    res.json({ token, id: _id });
                }
                // jika password salah
                else {
                    next({ auth: true, status: 403, message: 'Email or password is wrong!' });
                }
            }
            // jika user tak ada
            else {
                next({ auth: true, status: 403, message: 'Email or password is wrong!' });
            }
        }).catch(next);
    }
}

module.exports = userController;