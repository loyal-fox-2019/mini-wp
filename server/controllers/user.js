const User = require('../models/user')
const { dehash } = require('../helpers/bcrypt')
const { genToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.G_CLIENT);


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

            res.status(200).json({ token })
        } catch (error) {
            next(error)
        }
    }

    static async register(req, res, next) {
        try {
            const { email, name, password } = req.body
            console.log(req.body);

            let user = await User.create({ email, name, password })
            let token = genToken({ id: user.id, name: user.name, email: user.email })

            res.status(201).json({ token, name })
        } catch (error) {
            next(error)
        }

    }

    static async googleSignIn(req, res, next) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.body.token,
                audience: process.env.GOOGLE_CLIENT_ID
            })

            User.findOne({ email: ticket.getPayload().email })
                .then((user) => {
                    if (!user) {
                        User.create({
                            email: ticket.getPayload().email,
                            name: ticket.getPayload().name,
                            password: ticket.getPayload().email
                        })
                            .then((result) => {
                                let tokenData = { id: result._id, name: result.name }
                                let token = genToken(tokenData)
                                res.status(201).json({ token, name: result.name, invitation: result.invitation })
                            }).catch(next);
                    } else {
                        let tokenData = { id: user._id, name: user.name }
                        let token = genToken(tokenData)
                        res.status(200).json({ token, name: user.name, invitation: user.invitation })
                    }
                })
                .catch(next);
        } catch (error) {
            next(error)
        }
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