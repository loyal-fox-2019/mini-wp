'use strict';
const { User } = require('../models');
const { sign } = require('../helpers/jwt');
const { compare } = require('../helpers/bcryptjs');
const { OAuth2Client } = require('google-auth-library');
const Client = new OAuth2Client(process.env.GOOGLE_CLIENTID)

class UserController {
  static async registerUser(req, res, next) {
    const { fullname, email, password } = req.body;
    const docs = {
      fullname,
      email,
      password,
    };
    try {
      const response = await User.create(docs)
      const { _id, email, fullname } = response;
      const payload = {
        id: _id,
        email
      };
      const accessToken = sign(payload);
      res.status(201).json({ accessToken, fullname })
    } catch (err) {
      next(err);
    }
  }
  static async userLogin(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email })
      if (!user) {
        // if user doesn't exist server will respond errors
        next({ auth: true, status: 401, message: 'Invalid email or password' });
      } else {
        if (compare(password, user.password)) {
          // if the password match then server respond with status 202 and send accessToken to client
          const { _id, email, fullname } = user
          const payload = {
            id: _id,
            email
          };
          const accessToken = sign(payload);
          res.status(202).json({ accessToken, fullname })
        } else {
          // else server will respond with errors
          next({ auth: true, status: 401, message: 'Invalid email or password' });
        }
      }
    } catch (err) {
      next(err);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const googlePayload = await Client.verifyIdToken({ idToken: req.body.idToken, audience: process.env.GOOGLE_CLIENTID })
      const { name, email } = googlePayload.getPayload();
      const user = await User.findOne({ email })
      if (!user) {
        const register = await User.create({fullname: name, email, password: 'helloword122'})
        const { _id, fullname } = register
        const payload = {
          id: _id,
          email
        };
        const accessToken = sign(payload);
        res.status(200).json({ accessToken, fullname })
      } else {
        const { _id, fullname } = user
        const payload = {
          id: _id,
          email,
        };
        const accessToken = sign(payload);
        res.status(200).json({ accessToken, fullname });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
