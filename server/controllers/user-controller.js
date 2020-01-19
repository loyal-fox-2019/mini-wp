const UserModel = require('../models/user-model')
const jwt = require('jsonwebtoken')
const password = require('../helper/hash')



class UserController{
    static signup (req,res,next){
        UserModel.findOne({
            email: req.body.email
        })
        .then((data)=>{
            if(data === null){
                return UserModel.create(req.body)
            }
            else{
                next()
            }
        })
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch((err)=>{
            next(err)
        })
    }
    static signin(req,res,next){
        let user = null
        UserModel.findOne({email: req.body.email})
        .then((data)=>{
            user = data
            if(data === null){
                next()
            }
            return password.compare(req.body.password, data.password)
        })
        .then((data)=>{
            if(data){
                let token = jwt.sign({userId: user['_id']}, process.env.SECRET)
                res.status(200).json({token:token, first_name: user['first_name'], last_name: user['last_name']})
            }
            next()
        })
        .catch(next)
    }

    static googlesignin(req,res,next){
        UserModel.findOne({email: req.body.email})
        .then((data)=>{
            if(data===null){
                return UserModel.create({
                    email: req.body.email,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    password: process.env.GENPASS
                })
            }
            return data
        })
        .then((data)=>{
            let token = jwt.sign({userId: data['_id']}, process.env.SECRET)
            res.status(200).json({token})
        })
        .catch(next)     
    }

}

module.exports= UserController