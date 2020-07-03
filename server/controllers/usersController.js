'use strict'

const User = require('../models/user')
const userErr = { status: 404, message: 'User not found'},
      loginErr = { status: 401, message: 'Incorrect email/password'}
const { validatePass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');

class UsersController {

  static findOne(req, res, next) {
    User.findById(req.params.id)
      .then(user => {
        if (user) {
          res.status(200).json(user).select('-password')
        } else {
          next(userErr)
        }
      })
      .catch(next)
  }

  static edit(req, res, next) {
    const { name, email, password } = req.body; 
    User.findByIdAndUpdate(
      req.decoded.id,
      { name, email, password, image: req.file.cloudStoragePublicUrl },
      { new: true, runValidators: true, omitUndefined: true }
    )
      .then(user => {
        res.status(200).json(user)
      })
      .catch(next)
  }

  static register(req, res, next) {
    const { name, email, password } = req.body; 
    User.create({ name, email, password })
      .then(user => {
        let payload = {
          id : user._id
        };
        let token = generateToken(payload);
        res.status(200).json({access_token: token, name: user.name, image: user.image })
        // let newUser = user.toObject();
        // delete newUser.password;
        // res.status(201).json(newUser)
      })
      .catch(next)
  }

  static signIn(req, res, next) {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          next(loginErr);
        } else if (validatePass(req.body.password, user.password)) {
          let payload = {
            id : user._id
          };
          let token = generateToken(payload);
          res.status(200).json({access_token: token, name: user.name, image: user.image, id: user._id })
        } else {
          next(loginErr);
        }
      })
      .catch(next)
  }

  static googleSignIn(req, res, next) {
    let personalInfo;
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
    client.verifyIdToken({
      idToken: req.body.id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
      .then(ticket => {
        personalInfo = ticket.getPayload()
        return User.findOne({ email: personalInfo.email })
      })
      .then(user => {
        if (user) {
          return user
        } else {
          return User.create({
            name: personalInfo.name,
            email: personalInfo.email,
            password: process.env.DEFAULT_PASSWORD,
            image: personalInfo.picture
          })
        }
      })
      .then(user => {
        let payload = {
          id: user._id,
          email: user.email
        }
        let token = generateToken(payload)
        res.status(200).json({access_token: token, name: user.name, id: user._id, image: user.image})
      })
      .catch(next)
  }
}

module.exports = UsersController