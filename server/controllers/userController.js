const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

class UserController {
    static register(req, res, next){
        let data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        User.create(data)
            .then(result => {
                res.status(201).json({
                    message: 'User Created',
                    data: {
                        email: result.email,
                        password: result.password
                    }
                })
            })
            .catch(err => {
                res.status(400).json(err)
            })
    }

    static login(req, res, next){
        let data = {
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({email: data.email})
            .then(result => {
                if(!result){
                    res.status(400).json({
                        message: 'Please register your account first'
                    })
                }else{
                    let compare = bcrypt.compareSync(data.password, result.password)
                    if(compare){
                        let token = jwt.sign({id: result._id, name: result.name, email: result.email}, process.env.JWT_SECRET)
                        res.status(200).json({
                            message: 'Successfully Login',
                            token: token,
                            name: result.name
                        })
                    }else{
                        res.status(400).json({
                            message: 'Wrong email/password!'
                        })
                    }
                }
            })
            .catch(err => {
                res.status(400).json({
                    message: 'Wrong email/password!',
                    error: err
                })
            })
    }

    static gSign(req,res,next){
        console.log('Masuk google')
        let payload = null
        let regData = null
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.CLIENT_ID
        })
            .then(ticket => {
                payload = ticket.getPayload()
                regData = {
                    name: payload.name,
                    email: payload.email,
                    password: process.env.DEFAULT_PASS
                }
                // console.log(payload)
                return User.findOne({email: regData.email})
            })
            .then(data => {
                if(data===null){
                    return User.create(regData)
                }else{
                    let token = jwt.sign({
                        id: data._id,
                        name: data.name,
                        email: data.email
                    }, process.env.JWT_SECRET)
                    res.status(200).json({
                        message: 'Login Success',
                        token: token,
                        id: data._id
                    })
                }
            })
            .then(data => {
                res.status(201).json({
                    message: 'Registration Success!'
                })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = UserController