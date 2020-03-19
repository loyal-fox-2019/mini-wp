const { User } = require('../models/index');
const { ObjectId } = require('mongoose').Types;
const generateToken = require('../helpers/generateToken');

class UserController {
    static create(req, res, next) {
        User.create({
            fullname: req.body.fullname,
            email: req.body.email,
            password: req.body.password
        })
            .then((newUser) => {
                const payload = {
                    id: newUser._id,
                    fullname: newUser.fullname,
                    email: newUser.email,
                }
                const token = generateToken(payload)
                res.status(201).json({
                    acc_token: token
                })
            })
            .catch((err) => {
                next(err)
            });
    }

    static login(req, res, next) {
        let userData
        User.findOne({
            email: req.body.email
        })
            .then((user) => {
                userData = user
                const comparePassword = require('../helpers/comparePassword');
                return comparePassword(req.body.password, userData.password)
            })
            .then((result) => {
                if (!result) {
                    res.status(400).json('Invalid email or password')
                } else {
                    const payload = {
                        id: userData._id,
                        fullname: userData.fullname,
                        email: userData.email
                    }
                    const token = generateToken(payload)
                    res.status(200).json({
                        acc_token: token
                    })
                }
            })
            .catch((err) => {
                next(err)
            });
    }

    static gSignIn(req, res, next) {
        const { OAuth2Client } = require('google-auth-library');
        const client = new OAuth2Client(process.env.G_CLIENT_ID);
        let payload
        client.verifyIdToken({
            idToken: req.body.idToken,
            audience: process.env.G_CLIENT_ID
        })
            .then((ticket) => {
                payload = ticket.getPayload();
                return User.findOne({ email: payload.email })
            })
            .then((user) => {
                if (user) {
                    return user
                } else {
                    const newUser = {
                        email: payload.email,
                        fullname: payload.given_name + ' ' + payload.family_name,
                        password: process.env.G_SIGN_DEF_PASSWORD
                    }
                    return User.create(newUser)
                }
            })
            .then((newUser) => {
                const token = generateToken({
                    id: newUser._id,
                    fullname: newUser.fullname,
                    email: newUser.email
                });
                res.status(201).json({
                    acc_token: token
                })
            })
            .catch((err) => {
                next(err)
            });
    }
}

module.exports = UserController
