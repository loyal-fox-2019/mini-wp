const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class UserController {
    static register(req, res, next){
        let data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        User.create(data)
            .then(result => {
                let token = jwt.sign({id: result._id, name: result.name, email: result.email}, process.env.JWT_SECRET)
                res.status(201).json({
                    message: 'User Created',
                    data: {
                        name: result.name,
                        email: result.email,
                        token: token
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
}

module.exports = UserController