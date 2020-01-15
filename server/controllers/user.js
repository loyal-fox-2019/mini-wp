const User = require('../models/user')
const { dehash } = require('../helpers/bcrypt')
const { genToken } = require('../helpers/jwt')

class Controller {

    static getUserData(req, res, next) {
        User.findById(req.decoded.id)
            .then((user) => {
                delete user.password
                res.status(200).json(user)
            }).catch(next);
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            let user = await User.findOne({ email: email })

            if (!user || !dehash(password, user.password)) throw ({ statusCode: 400, message: "Email or password wrong!" })

            let token = genToken({ id: user.id, name: user.name, email: user.email })

            res.status(200).json(token)
        } catch (error) {
            next(error)
        }
    }

    static async register(req, res, next) {
        try {
            const { email, name, password } = req.body

            let user = await User.create({ email, name, password })
            let token = genToken({ id: user.id, name: user.name, email: user.email })

            res.status(201).json(token)
        } catch (error) {
            next(error)
        }

    }

    static google(req, res, next) {

    }

    static async allUser(req, res, next) {
        try {
            let users = await User.find()
            res.status(200).json(users)
        } catch (error) {
            next(error)
        }
    }

}

module.exports = Controller