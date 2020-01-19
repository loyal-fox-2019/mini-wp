const UserModel = require('../models/user')
const bcrypt = require('bcrypt')
const { generateJWT, verifyJWT } =  require('../helpers/jwt')

class UserController {
    static register(req,res,next){
        UserModel.create(req.body)
        .then(result=>{
            let payload = {
                userId: result._id,
                name: result.name,
                email: result.email
            }
            let token = generateJWT(payload)
            res.status(201).json(token)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static glogin(req,res,next) {
        let userData = {
            name: req.user.name,
            email: req.user.email,
            password: process.env.DEFAULT_PASS
        }
        UserModel.findOne({
            email: userData.email
        })
        .then(user=>{
            if(user){
                return user 
            }
            else {
                return UserModel.create(userData)
            }
        })
        .then(result=>{
            let payload = {
                userId: result._id,
                name: result.name,
                email: result.email
            }
            let token = generateJWT(payload)
            res.status(201).json(token)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
        
    }

    static login(req,res,next) {
        UserModel.findOne({
            email: req.body.email
        })
        .then(user=>{
            if(user){
                if(bcrypt.compareSync(req.body.password, user.password)){
                    let payload = {
                        userId: user._id,
                        name: user.name,
                        email: user.email
                    }
                    let token = generateJWT(payload)
                    res.send(token)
                }
                else {
                    res.status(400).json({message: "Wrong email/password"})
                }
            }
            else {
                res.status(400).json({message: "Wrong email/password"})
            }
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }
}

module.exports = UserController