const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class User {
  static register(req, res, next) {
    const {
      firstName,
      lastName,
      username,
      email,
      password
    } = req.body;

    userModel.create({
        first_name: firstName,
        last_name: lastName,
        username,
        email,
        password,
        created_at: new Date()
      })
      .then((user) => {
        const {
          _id,
          first_name,
          last_name,
          username,
          email,
          created_at
        } = user;

        res.status(201).json({
          user: {
            _id,
            firstName: first_name,
            lastName: last_name,
            username,
            email,
            join: created_at
          },
          message: 'Registration Success'
        });
      }).catch(next);
  }

  static login(req, res, next) {
    const {
      username,
      password
    } = req.body;

    userModel.findOne({
        $or: [{
          username: username
        }, {
          email: username
        }]
      })
      .then((user) => {
        if (!user) {
          let err = new Error('User not registered');
          err.statusCode = 404;
          throw err;
        } else if (!bcrypt.compareSync(password, user.password)) {
          let err = new Error('Incorrect username or password');
          err.statusCode = 403;
          throw err;
        } else {
          return jwt.sign({
            _id: user._id,
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            join: user.created_at
          }, process.env.CLIENT_SECRET)
        }
      }).then((token) => {
        res.status(200).json({
          token
        });
      }).catch(next);
  }
}

module.exports = User;