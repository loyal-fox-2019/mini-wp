'use strict';

const User = require('../models/user');
const Bcrypt = require('../helper/bcrypt');
const Jwt = require('../helper/jwt');

class UserController {
    static register(req, res, next) {
        const newUser = {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        }
        User.create(newUser)
        .then(user => {
            res.status(201).json({
                message: "User has been successfully registered",
                data: user
            });
        })
        .catch(error => {
            next(error);
        })
    }

    static login(req, res, next) {
        User.findOne({email: req.body.email})
        .then(user => {
            if(!user) {
                throw {
                    name: 'BadRequest',
                    message: "Incorrect email or password"
                }
            } else {
                const verifyPassword = Bcrypt.decodePassword(req.body.password, user.password);
                if(!verifyPassword) {
                    throw {
                        name: 'BadRequest',
                        message: "Incorrect email or password"
                    }
                } else {
                    const payload = {
                        id: user.id
                    }
                    const userToken = Jwt.generateToken(payload);
                    res.status(200).json({
                        message: "Loggin successful",
                        data: userToken
                    })
                }
            }
        })
        .catch(error => {
            next(error);
        })
    }
}

module.exports = UserController;