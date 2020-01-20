const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('../helpers/jwt')

module.exports = class {
    static register(req, res, next) {
        // console.log(req.body.email);
        User.findOne({ email: req.body.email })
            .exec()
            .then((data) => {
                if (data) {
                    res.status(409).json({
                        message: 'mail exist'
                    })
                } else {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) {
                            console.log('this is bcryot error \n', err);
                            res.status(500).json({
                                error: err
                            })
                        } else {
                            User.create({
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                email: req.body.email,
                                phone: req.body.phone,
                                password: hash
                            }, (err, data) => {
                                if (err) {
                                    res.status(500).json({
                                        error: err
                                    })
                                } else {
                                    res.status(201).json(data)
                                }
                            })
                        }
                    })
                }
            }).catch((err) => {

            })
    }

    static login(req, res, next) {
        console.log(req.body);

        User.findOne({ email: req.body.email })
            .exec()
            .then((user) => {
                if (!user) {
                    res.status(401).json({
                        message: 'Auth failed satu'
                    })
                } else {
                    bcrypt.compare(req.body.password, user.password, (err, data) => {
                        if (err || !data) {
                            return res.status(401).json({
                                message: 'Auth failed dua'
                            })
                        } else {
                            let token = jwt.generateToken({
                                email: user.email,
                                userId: user._id
                            })
                            res.status(200).json({
                                token: token
                            })
                        }
                    })
                }
            }).catch((err) => {
                res.status(401).json({
                    message: 'Auth Failed empat'
                })
            })
    }

    static findOne(req, res, next){
        User
            .findById(req.userLogin._id)
            .exec()
            .then((data) => {
                res.status(200).json(data)
            }).catch((err) => {
                console.log(err)
                res.status(500).json({
                    error: err
                })
            })
    }
}