const { OAuth2Client } = require('google-auth-library')
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const randomPassword = require('../helpers/random-password')

class ThirdAPIController {
  static loginGoogle(req, res, next) {
    let payload = null

    if (!req.body.googleToken) {
      return next({ name: 'BadRequest', message: 'Google token is required' })
    }

    googleClient
      .verifyIdToken({
        idToken: req.body.googleToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      })
      .then(ticket => {
        payload = ticket.getPayload()
        return User.findOne({ email: payload.email })
      })
      .then(user => {
        if (user) {
          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
          res.json({ token, username: user.username })
        } else {
          return User.create({
            username: payload.name,
            email: payload.email,
            password: randomPassword(),
          })
        }
      })
      .then(user => {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
        res.json({ token, username: user.username })
      })
      .catch(next)
  }

  static loginGithub(req, res, next) {
    res.json({ message: 'welcome to login google router' })
  }

  static loginTwitter(req, res, next) {
    res.json({ message: 'welcome to login twitter router' })
  }
}

module.exports = ThirdAPIController
