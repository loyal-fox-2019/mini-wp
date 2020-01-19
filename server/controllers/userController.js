const { OAuth2Client } = require('google-auth-library')
const user = require('../models/users')
const jwt = require('jsonwebtoken')
const article = require('../models/articles')
const comparePass = require('../helpers/bcryptCompare')
// const comparePass = require('../helpers/bcryptCompare')

class UserController {
    static register(req, res, next){
        let payload = {}
        let token
        user.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        .then(createdUser=>{
            payload.id = createdUser._id
            payload.name = createdUser.name
            token = jwt.sign(payload, process.env.JWT_SECRET)
            res.status(201).json(token)
        })
        .catch(err=>{
            next('Registration Failed')
        })
    }

    static login(req, res, next){
        let token
        let payload = {}
        user.findOne({email:req.body.email})
        .then(userData=>{
            if(!userData){
                res.status(404).json('Invalid email or password')
            }else{
                payload.id = userData._id
                payload.name = userData.name
                return comparePass(req.body.password, userData.password)
            }
        })
        .then(result=>{ //password compare result
            // console.log(result)
            if(!result){
                res.status(403).json('Invalid email or password')
            }
            token = jwt.sign(payload, process.env.JWT_SECRET)
            res.status(200).json(token)
        })
        .catch(err=>{
            next('Login Failed')
        })
    }

}

module.exports = UserController