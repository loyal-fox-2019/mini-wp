'use strict'

const { User } = require('../models')
const bcrypt = require('bcryptjs')
const { generateToken, verifyToken } = require('../helpers/verifyToken')

class userController {
  static login(req, res, next) {
    const { email, password } = req.body

    User
      .findOne({ email })
      .then(user => {
        if(user) {
          const valid = bcrypt.compareSync(password, user.password)
          if(valid) {
            const token = generateToken({ id: user._id })
            const data = {
              username: user.username,
              token
            }
            res.status(200).json(data)
          } else {
            throw ({
              status: 400,
              message: 'Your email/password is wrong'
            })
          }
        } else {
          throw ({
            status: 400,
            message: 'Your email is not registered'
          })
        }
      })
      .catch(next)
  }
}

module.exports = userController