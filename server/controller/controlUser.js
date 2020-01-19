const modelUser = require('../models/modelUser')
const generateToken = require('../middleware/generateToken')
const cocokPass = require('../middleware/cocokPass')
let bcrypt = require('bcrypt')
const verifyTokenG = require('../middleware/verifyTokenG')

class ControlUser {
    static register(req, res, next) {
        modelUser.findOne({ email: req.body.email })
            .then(data => {
                if (data) {
                    res.status(400).json({ message: "email already taken" })
                } else {
                    return modelUser.create(req.body)
                }
            })
            .then(userTerdaftar => {
                let token = generateToken({ id: userTerdaftar._id })
                req.headers.token = token
                req.userid = userTerdaftar._id
                res.status(201).json({ userTerdaftar, token, message: "user registered successfully" })
            })
            .catch(err => {
                res.status(500).json({ err, message: "Internal Server Error" })
            })
    }
    static allUser(req, res, next) {
        modelUser.find()
            .then(allUsers => {

                res.status(200).json(allUsers)
            })
            .catch(err => {
                res.status(500).json({ err, message: "Internal server error" })
            })
    }
    static login(req, res, next) {
        modelUser.findOne({ email: req.body.email })
            .then(userFound => {
                if (userFound) {
                    const matchPass = cocokPass(req.body.password, userFound.password)
                    if (matchPass) {
                        let token = generateToken({ id: userFound._id })
                        req.headers.token = token
                        req.userid = userFound._id
                        res.status(200).json({ userFound, token, message: "login successfully" })
                    } else {
                        res.status(400).json({ message: "wrong username/password" })
                    }
                } else {
                    res.send({ message: "wrong username/password" })
                }
            })
            .catch(err => {
                res.status(500).json({ err, message: "Internal Server Error" })
            })
    }
    static google(req, res, next) {
        // console.log(req.body)
        let email
        const tokenGoogle = req.body.idtoken
        const payload = verifyTokenG(tokenGoogle)

        payload.then(data => {
            email = data.email

            return modelUser.findOne({
                email
            })
        })
            .then(result => {
                // console.log(result, "ini dia")
                // console.log(email, "ini email")
                if (result) {
                    return result
                } else {
                    return modelUser.create({
                        firstName: req.body.firstName,
                        email: email,
                        password: process.env.USERPASSWORD
                    })
                }

            })
            .then(user => {
                let token = generateToken({ id: user._id })
                req.headers.token = token
                req.userid = user._id
                res.status(201).json({ user, token, message: "user registered successfully" })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}
module.exports = ControlUser