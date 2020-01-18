const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { checkPassword } = require('../helpers/bcrypt')
class AuthController {

    static register(req, res, next){
        const form  = req.body
        User
            .create({
                username: form.username,
                email: form.email,
                password: form.password,
                role: 'Author'
            })
            .then(user => {
                const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET )
                res.status(200).json({
                    token
                })
            })
            .catch(next)
    }

    static login(req, res, next){
        const form = req.body
        User
            .findOne({
                username: form.username
            })
            .then(user => {
                const error = {
                    name: 'ValidationError',
                    message: 'username/password incorrect'
                }
                if (user) {
                    const isPassword = checkPassword(form.password, user.password)
                    if (isPassword) {
                        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET )
                        res.status(200).json({
                            token
                        })
                    }else{
                        throw error
                    }
                }else{
                    throw error
                }
            })
            .catch(next)
    }
}
module.exports = AuthController