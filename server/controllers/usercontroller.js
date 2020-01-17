const User = require('../models/user')
const {generateToken} = require('../helpers/jwt')
const {compare} = require('../helpers/encrypt')
const verifyGoogle = require('../helpers/verifyGoogle')

class UserController{
    static register(req,res,next){
        User.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        })
        .then(result =>{
            const obj={
                username: result.username,
                email: result.email
            }
            const token = generateToken(obj)
            res.status(201).json({
                token
            })
        })
        .catch(next)
    }
    static login(req,res,next){
        let password = req.body.password
        User.findOne({
            email: req.body.email
        })
        .then(result=>{
            if(result){
                const compared = compare(password, result.password)
                if(compared){
                    //generate token
                    const obj={
                        username: result.username,
                        email: result.email
                    }
                    const token = generateToken(obj)
                    res.json({
                        token
                    })
                }else{
                    res.status(400).json({
                        message: 'wrong username/password'
                    })
                }
            }else{
                res.status(400).json({
                    message: 'user not found'
                })
            }
        })
        .catch(next)
    }
    static gsignin(req,res,next){
        let email=null
        let name=null
        const token = req.body.data.id_token
        const payload = verifyGoogle(token)
        payload.then(data=>{
            // console.log('controller google')
            // console.log(data)
            email = data.email
            name = data.name
            return User.findOne({
                email
            })
        })
        .then(result=>{
            if(result){
                return result
            }else{
                return User.create({
                    username: name,
                    email,
                    password: process.env.USER_PASSWORD
                })
            }
        })
        .then(user=>{
            res.send(user)
        })
        .catch(err=>{
            console.log(err)
            next(err)
        })
    }
}

module.exports = UserController