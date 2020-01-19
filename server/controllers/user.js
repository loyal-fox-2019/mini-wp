const { User, Article } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { verifyPassword } = require('../helpers/bcrypt')
// const axios = require('axios')

class UserController {
  static register(req, res, next) {
    const { username, email, password } = req.body
    User.create({
      username,
      email,
      password
    })
      .then(user => {
        res.status(201).json({
          _id: user.id,
          username: user.username,
          email: user.email
        })
      })
      .catch(next)
  }
  
  static login(req, res, next) {
    const payload = {}
    let access_token
    const { email, password } = req.body
    if (!email && !password) next({ statusCode: 400, message: 'Email and password must be filled out!' })
    if (!email) next({ statusCode: 400, message: 'Email must be filled out!' })
    if (!password) next({ statusCode: 400, message: 'Password must be filled out!' })
      User.findOne({ email })
      .then(user => {
        if (user && verifyPassword(password, user.password)) {
            payload.id = user._id
            payload.email = user.email
            payload.username = user.username
            access_token = generateToken(payload)
            res.status(200).json({ access_token: `token ${access_token}` })
        } else {
          next({ statusCode: 400, message: 'Invalid email/password'})
        }
      })
      .catch(next)
  }

  static profile(req, res, next) {
    res.status(200).json(req.decoded)
  }

  static findMyArticles(req, res, next) {
    Article.find({ author: req.decoded.id })
      .sort({ createdAt: -1 })
      .then(articles => {
        res.status(200).json(articles)
      })
      .catch(next)
  }

  static githubLogin(req, res, next) {
    const { code } = req.query
    console.log(code, '!!!!!')
    axios({
      method: 'post',
      url: 'https://github.com/login/oauth/access_token',
      params: {
        client_id: '92db47bd6c7ba394101d',
        client_secret: '94b34153bc7547309cc376aef5fb78de5b7d7e64',
        scope: 'user:email',
        code
      }
    })
      .then(({ data }) => {
        console.log(data)
        let access_token = data.substring(data.indexOf('=')+1, data.indexOf('&'))
        console.log(access_token, '<<<')
        // res.status(200).json({
        //   access_token
        // })
        return axios({
          method: 'get',
          url: 'https://api.github.com/user/emails',
          headers: {
            Authorization: `token ${access_token}`
          }
        })
      })
      .then(({ data }) => {
        console.log(data)
        res.status(200).json(data)
      })
      .catch(next)
  }
}

module.exports = UserController