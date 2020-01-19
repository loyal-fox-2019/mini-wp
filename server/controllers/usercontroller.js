const User = require('../models/user')
const {generateToken} = require('../helpers/jwt')
const {compare} = require('../helpers/encrypt')
const verifyGoogle = require('../helpers/verifyGoogle')

class UserController{
    static register(req,res,next){
        // console.log(req.body)
        User.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            picture: req.body.picture
        })
        .then(result =>{
            const obj={
                _id: result._id,
                username: result.username,
                email: result.email,
                picture: req.body.picture
            }
            const token = generateToken(obj)
            res.status(201).json({
                token,
                username: result.username,
                email: result.email,
                picture: result.picture
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
                        _id: result._id,
                        username: result.username,
                        email: result.email,
                        picture: req.body.picture
                    }
                    const token = generateToken(obj)
                    res.json({
                        token,
                        username: result.username,
                        email: result.email,
                        picture: result.picture
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
        // console.log('masuk gsignin')
        let email=null
        let name=null
        let picture = null
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
                //generate token
                // console.log(picture)
                let obj={
                    _id: result._id,
                    username: result.username,
                    email: result.email,
                }
                const token = generateToken(obj)
                res.status(200).json({
                    message: 'User Signed In',
                    token,
                    username: result.username,
                    email: result.email,
                    picture: result.picture
                })
            }else{
                return User.create({
                    username: name,
                    email,
                    password: process.env.USER_PASSWORD,
                    picture: process.env.DEFAULT_PICTURE
                })
            }
        })
        .then(user=>{
            // console.log(user)
            let obj={
                _id: user._id,
                username: user.username,
                email: user.email
            }
            const token = generateToken(obj)
            res.status(200).json({
                message: 'User Signed In',
                token,
                username: user.username,
                email: user.email,
                picture: user.picture
            })
        })
        .catch(err=>{
            console.log(err)
            next(err)
        })
    }
}

module.exports = UserController