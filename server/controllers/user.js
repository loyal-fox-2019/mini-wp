const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

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
          email,
          created_at
        } = user;

        return jwt.sign({
          _id,
          name: `${first_name} ${last_name}`,
          email,
          join: created_at
        }, process.env.CLIENT_SECRET)
      }).then((token) => {
        res.status(201).json({
          token,
          name: `${firstName} ${lastName}`
        })
      }).catch(next);
  }

  static login(req, res, next) {
    const {
      username,
      password
    } = req.body;
    let name;

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
          name = `${user.first_name} ${user.last_name}`;
          return jwt.sign({
            _id: user._id,
            name,
            email: user.email,
            join: user.created_at
          }, process.env.CLIENT_SECRET)
        }
      }).then((token) => {
        res.status(200).json({
          token, name
        });
      }).catch(next);
  }

  static googleOauth(req, res, next) {
    const {idToken} = req.body;
    let oauthPayload;

    client.verifyIdToken({
      idToken,
      audience: process.env.CLIENT_ID
    })
      .then((ticket) => {
        oauthPayload = ticket.getPayload();

        return userModel.findOne({
            username: oauthPayload.sub
        })
      }).then((user) => {
        if (user) {
          return user;
        } else {
          return userModel.create({
            first_name: oauthPayload.given_name,
            last_name: oauthPayload.family_name,
            password: 'notsafeforpassword',
            username: oauthPayload.sub,
            email: oauthPayload.email,
            avatar: oauthPayload.picture
          });
        }
      }).then((registeredUser) => {
        const token = jwt.sign({
            _id: registeredUser._id,
            name: registeredUser.name,
            email: registeredUser.email,
            avatar: registeredUser.avatar
        }, process.env.CLIENT_SECRET);

        res.status(200).json({
          token, 
          name: oauthPayload.name
        });
      }).catch(next);
  }
}

module.exports = User;