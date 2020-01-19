const { OAuth2Client } = require('google-auth-library')
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const randomPassword = require('../helpers/random-password')
const axios = require('axios')

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
            platform: 'google',
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
    if (!req.body.code) {
      return next({ name: 'BadRequest', message: 'Code is required' })
    }

    let access_token = null
    let user_email = null
    let user_login = null

    axios
      .post(
        `https://github.com/login/oauth/access_token`,
        {},
        {
          params: {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code: req.body.code,
          },
          headers: {
            Accept: 'application/json',
          },
        },
      )
      .then(({ data }) => {
        access_token = data.access_token
        return axios.get('https://api.github.com/user/emails', {
          headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: `token ${access_token}`,
          },
        })
      })
      .then(({ data }) => {
        user_email = data[0].email
        return axios.get('https://api.github.com/user', {
          headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: `token ${access_token}`,
          },
        })
      })
      .then(({ data }) => {
        user_login = data.login
        return User.findOne({ email: user_email })
      })
      .then(user => {
        if (user) {
          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
          res.json({ token, username: user.username })
        } else {
          return User.create({
            username: user_login,
            email: user_email,
            password: randomPass(),
          })
        }
      })
      .then(user => {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
        res.json({ token, username: user.username })
      })
      .catch(next)
  }

  static loginTwitter(req, res, next) {
    res.json({ message: 'welcome to login twitter router' })
  }
}

module.exports = ThirdAPIController
