const { OAuth2Client } = require('google-auth-library')
const user = require('../models/users')
const jwt = require('jsonwebtoken')
const article = require('../models/articles')
// const comparePass = require('../helpers/bcryptCompare')

class UserController {
    static googleLogin(req, res, next) {
        let googlePayload
        let userPayload = {}
        let token
        // console.log(req.body)
      const clientId = process.env.GOOGLE_CLIENT_ID
      const client = new OAuth2Client(clientId)
    //   console.log(client)
      client.verifyIdToken({
          idToken: req.body.idToken,
          audience: clientId
      })
        .then(ticket => {
            console.log(ticket)
            googlePayload = ticket.getPayload()
            //  return user.findOne({email: googlePayload.email})
        })
        // .then(userData=>{
        //     console.log('USER DATA=====>',data)
        //     if(userData){
        //         userPayload.id = userData._id
        //         userPayload.name = userData.name
        //         userPayload.toDos = userData.toDos
        //         token = jwt.sign(userPayload, process.env.JWT_SECRET)
        //         return
        //     }else{
        //         return user.create({
        //             name: googlePayload.name,
        //             email: googlePayload.email,
        //             password: process.env.DEFAULT_PASS
        //         })
        //     }
        // })
        // .then(createdData=>{
        //     console.log('createdData',createdData)
        //     if(createdData){
        //         userPayload.id = createdData._id
        //         userPayload.name = createdData.name
        //         token = jwt.sign(userPayload, process.env.JWT_SECRET)
        //     }
            // return article.find({
            //     author : userPayload.id
            // })
        // })
        // .then(toDosData=>{
        //     // console.log(toDosData)
        //     res.status(200).json({toDosData, token})
        // })
        .catch(err=>{
            next('Login Failed')
            // console.log(err)
        })
    }

}

module.exports = UserController