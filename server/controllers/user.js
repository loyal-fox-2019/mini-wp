"use strict"

const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { checkPassword } = require('../helpers/bcrypt')

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
}

module.exports = userController