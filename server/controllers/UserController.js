const User = require('../models/User')
const {sign} = require('../helpers/token')
const {compare} = require('../helpers/bcrypt')
const axios = require('axios')

class UserController{

  static googleLogin(req, res, next){
    const { token } = req.body
    let googleData = {}
    axios({
      method: 'GET',
      url: `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`
    })
      .then(({data}) => {
        googleData = data
       return User
        .findOne({
          email: data.email
        })
      })
      .then((user) => {
        if (user) {
          return user
        }
        else {
          return User
            .create({
              email: googleData.email,
              password: process.env.DEFAULT_PASS
            })
        }
      })
      .then((userData) => {
        let token = sign({
          userId: userData._id
        })
        res.status(200).json(token)
      })
      .catch(next)
  }

  static login(req, res, next){
    User.findOne({
      email: req.body.email
    })
      .then((data) => {
        if (data){
          if (compare(req.body.password, data.password)){
            let token = sign({
              userId: data._id
            })
            res.status(200).json(token)
          }
          else{
            throw {
              code: 400,
              message: `Wrong email or password`
            }
          }
        }
        else {
          throw {
            code: 400,
            message: `Wrong email or password`
          }
        }
      })
      .catch(next)
  }

  static register(req, res, next){
    let { email, password } = req.body
    User.create({ email, password })
      .then((data) => {
        let token = sign({
          userId: data._id
        })
        res.status(201).json(token)
      })
      .catch(next)
  }

}

module.exports = UserController