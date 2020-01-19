const Model = require('../models/user')
const { generateToken, verifyToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')

class User {
    static register(req, res, next) {
        Model.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
            .then(created => {
                const token = generateToken({
                    id: created._id,
                    name: created.name,
                    email: created.email
                })
                res.status(201).json(token)
            })
            .catch(next)
    }
    static login(req, res, next) {
        const err = {
            name: 'login failed',
            message: 'Wrong Email/Password'
        }
        Model.findOne({ email: req.body.email })
            .then(user => {
                if (user) {
                    const passwordCheck = comparePassword(req.body.password, user.password)
                    if (passwordCheck) {
                        const token = generateToken({
                            id: user._id,
                            name: user.name,
                            email: user.email
                        })
                        res.status(200).json(token)
                    } else {
                        throw err
                    }
                } else {
                    throw err
                }

            })
            .catch(next)
    }
}

module.exports = User