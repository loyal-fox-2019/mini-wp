const User = require('../models/userModel');
const {comparer} = require('../helpers/bcyrpt')
const {tokenGenerator} = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_ID);

class UserController{
    static create(req,res,next){
        User.create({
            email : req.body.email,
            password : req.body.password
        })
        .then((docs) => {
            console.log(docs)
            const token = tokenGenerator(req.body)
            res.status(201).json(token)
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json({message : "Bad request", err})
        });
    }

    static login(req,res,next){
        console.log('masuk login')
        User.findOne({
            email : req.body.email
        })
        .then(response =>{
            if(response){
                console.log('uses exist')
                if(comparer(req.body.password,response.password)){
                    console.log('masuk ke kirim token')
                    const token = tokenGenerator(req.body)
                    console.log('token : '+token)
                    res.status(200).json(token)
                } else {
                    res.status(400).json({message : "invalid username or password"})
                }
            } else {
                console.log('user does not exist')
                res.status(400).json({message : "user is not registered"})
            }
        })
    }

    static google(req,res,next){
        console.log("masuk ke google sign in")
        // console.log(req.body.token)
        client.verifyIdToken({
            idToken: req.body.token,
            audience: process.env.GOOGLE_ID
        })
        .then(ticket => {
            console.log(ticket)
            User.findOne({
                email : ticket.payload.email
            })
            .then(user =>{
                if(user){
                    return user
                } else {
                    return User.create({
                        email : ticket.payload.email,
                        password : process.env.DEFAULT_PASSWORD
                    })
                }
            })
            .then(user => {
                console.log(user)
                const payload = {
                    email : user.email,
                    password : user.password
                }
                let token = tokenGenerator(payload)
                res.status(200).json({token,author : user.email})
            })
            .catch(err => {
                console.log(err)
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
}

module.exports = UserController
