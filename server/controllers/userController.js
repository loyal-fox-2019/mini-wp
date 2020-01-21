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

    static googleSign(req, res, next){
        let googlePayload
        let userPayload = {}
        let token
        // console.log('masuk controller')
      const clientId = process.env.CLIENT_ID
      const client = new OAuth2Client(clientId)
      client.verifyIdToken({
        idToken: req.body.googleToken,
        audience: clientId
    })
      .then(ticket => {
          googlePayload = ticket.getPayload()
        //   console.log(googlePayload)
           return user.findOne({email: googlePayload.email})
      })
      .then(userData=>{
        // console.log('USER DATA=====>',userData)
        if(userData){
            userPayload.id = userData._id
            userPayload.name = userData.name
            userPayload.toDos = userData.toDos
            token = jwt.sign(userPayload, process.env.JWT_SECRET)
            return
        }else{
            return user.create({
                name: googlePayload.name,
                email: googlePayload.email,
                password: process.env.DEFAULT_PASSWORD
            })
        }
    })
    .then(createdData=>{
        console.log('INI CREATED==>',createdData)
        if(createdData){
            userPayload.id = createdData._id
            userPayload.name = createdData.name
            token = jwt.sign(userPayload, process.env.JWT_SECRET)
        }
        res.status(200).json(token)
    })
    
    .catch(err=>{
        next('Login Failed')
        // console.log(err)
    })

    }

}

module.exports = UserController