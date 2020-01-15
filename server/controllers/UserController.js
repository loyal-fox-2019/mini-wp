const User = require('../models/User'),
    { compare } = require('../helpers/encrypt'),
    { generateToken } = require('../helpers/jwt'),
    { OAuth2Client } = require('google-auth-library');
    client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class AuthorController {

  static async signUp(req, res, next) {
    try {
      let { name, email, password } = req.body
      if (email) { email = email.toLowerCase() }
      let user = await User.create({ name, email, password })
      let token = generateToken({ id: user._id })
      res.status(201).json({ token })
    } catch (error) {
      next(error)
    }
  }
  
  static async signIn(req, res, next) {
    try {
      let { email, password } = req.body
      if (email) { email = email.toLowerCase() }
      let user = await User.findOne({ email })
      console.log(user)
      if (!user || !compare(password, user.password)) {
        next({ status: 404, message: 'Invalid Email or Password' })
      } else {
        let token = generateToken({ id: user._id })
        res.status(200).json({token})
      }
    } catch (error) {
      next(error)
    }
  }

  static async googleSignIn(req, res, next) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: req.body.idToken,
        audience: process.env.GOOGLE_CLIENT_ID  
      })
      const payload = ticket.getPayload();
      let user = await User.findOne({ email: payload.email })
      if (user) {
        let token = generateToken({ id: user._id })
        res.status(200).json({token})
      } else {
        let { name, email } = payload
        let password = process.env.GOOGLE_DEFAULT_PASSWORD
        let user = await User.create({ name, email, password })
        let token = generateToken({ id: user._id })
        res.status(201).json({ token })
      }
    } catch (error) {
      next(error)
    }
  }

}

module.exports = AuthorController