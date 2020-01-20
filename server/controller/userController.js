'use strict'

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { OAuth2Client } = require('google-auth-library')

const userModel = require('../model/user')

class userController {
    static register(req, res, next) {
        const { name, email, password } = req.body
        const userRegisterData = {
            name: name,
            email: email,
            password: password
        }
        userModel.create(userRegisterData)
            .then(user => {

                const payload = {
                    userID: user._id,
                    name: user.name,
                    email: user.email
                }

                const token = jwt.sign(payload, process.env.JWT_SECRET)

                res.status(201).json({
                    message: `registration success!`,
                    access_token: token
                })
            })
            .catch(next)
    }

    static login(req, res, next) {
        console.log('masuk')
        const { email, password } = req.body

        if (!email || !password) {
            res.status(400).json({
                message: `email & password requrired!`
            })
        }
        else {
            userModel.findOne({
                email: email
            })
                .then(user => {
                    if (!user || !bcrypt.compareSync(password, user.password)) {
                        res.status(400).json({
                            message: `invalid email or password!`
                        })
                    }
                    else {
                        const payload = {
                            userID: user._id,
                            name: user.name,
                            email: user.email,
                        }
                        const token = jwt.sign(payload, process.env.JWT_SECRET)

                        res.status(200).json({
                            message: 'login success!',
                            access_token: token
                        })
                    }
                })
        }
    }

    static googleSignIn(req, res, next) {
        const { idToken } = req.body
        let googleUserPayload = null
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: idToken,
                audience: process.env.GOOGLE_CLIENT_ID,
            })
            const payload = ticket.getPayload()
            googleUserPayload = payload
        }
        verify().catch(next)

        userModel.findOne({
            email: googleUserPayload.email
        })
            .then(user => {
                if (!user) {
                    const userRegisterData = {
                        name: googleUserPayload.name,
                        email: googleUserPayload.email,
                        password: '1234567890defaultpassword'
                    }
                    userModel.create(userRegisterData)
                        .then(user => {
                            const payload = {
                                userID: user._id,
                                name: user.name,
                                email: user.email
                            }

                            const token = jwt.sign(payload, process.env.JWT_SECRET)

                            res.status(201).json({
                                message: `registration success!`,
                                access_token: token
                            })
                        })
                        .catch(next)
                }
                else {
                    const payload = {
                        userID: user._id,
                        name: user.name,
                        email: user.email
                    }

                    const token = jwt.sign(payload, process.env.JWT_SECRET)

                    res.status(201).json({
                        message: `registration success!`,
                        access_token: token
                    })
                }
            })
            .catch(next)
    }
}

module.exports = userController