"use strict"

const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { checkPassword } = require('../helpers/bcrypt')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID_GOOGLE)

class userController {
    static register(req, res, next) {
        const { email, password, username } = req.body
        User.create({
            email,
            password,
            username
        })
            .then((user) => {
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
                res.status(201).json({ user, token })
            }).catch((err) => {
                console.log(err)
                next(err)
            });
    }

    static login(req, res, next) {
        User.findOne({ email: req.body.email })
            .then((user) => {
                const { email, username, password, _id } = user
                if (user === null) {
                    next({
                        status: 400,
                        message: "email/password wrong"
                    })
                } else {
                    const check = checkPassword(req.body.password, user.password)
                    if (!check) {
                        next({
                            status: 400,
                            message: "email/password wrong"
                        })
                    } else {
                        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
                        res.status(200).json({
                            _id,
                            email,
                            password,
                            username,
                            token
                        })
                    }
                }
            }).catch((err) => {
                next(err)
            });
    }

    static loginGoogle(req, res, next) {
        let payload = null
        client.verifyIdToken({
            idToken: req.body.idToken,
            audience: process.env.CLIENT_ID_GOOGLE
        })
            .then((data) => {
                payload = data.getPayload()
                return User.findOne({
                    email: payload.email,
                    id: payload.id
                })
            })
            .then((user) => {
                if (user) {
                    console.log(payload)
                    // let accessToken = jwt.sign({
                    //     _id: payload._id
                    // }, process.env.JWT_SECRET)
                    // res.status(200).json({ accessToken, user })
                } else {
                    // return User.create({
                    //     email: payload.email,
                    //     password: ~~(Math.random() * 99999) + 1,
                    //     fullname: payload.name,
                    //     picture: payload.picture
                    // })
                }
            })
            .then((user) => {
                // let accessToken = jwt.sign({
                //     email: payload.email
                // }, process.env.JWT_SECRET)
                // mailer(payload.email)
                // res.status(200).json({ accessToken, user })
            })
            .catch((err) => {
                next(err)
            });
    }
}

module.exports = userController