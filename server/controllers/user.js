const User = require("../models/user"),
  { compare } = require("../helpers/bcrypt"),
  { OAuth2Client } = require("google-auth-library"),
  { generateToken } = require("../helpers/jwt");

class UserController {
  static all(req, res, next) {
    User.find()
      .then(users => {
        res.status(200).json(users);
      })
      .catch(next);
  }
  static login(req, res, next) {
    const { email, password } = req.body;
    User.findOne({ email })
      .then(user => {
        if (!user) {
          next({ status: 400, message: "invalid email or password" });
        } else if (!compare(password, user.password)) {
          next({ status: 400, message: "invalid password or email" });
        } else {
          res.status(200).json({ token: generateToken({ _id: user._id }) });
        }
      })
      .catch(next);
  }
  static register(req, res, next) {
    const { username, email, password } = req.body;
    User.create({
      username,
      email,
      password
    })
      .then(user => {
        res.status(201).json(user);
      })
      .catch(next);
  }
  static googleLogin(req, res, next) {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    let googlePayload = null;
    const client = new OAuth2Client(clientId);
    client
      .verifyIdToken({
        idToken: req.body.idToken,
        audience: clientId
      })
      .then(ticket => {
        googlePayload = ticket.getPayload();
        return User.findOne({ email: googlePayload.email });
      })
      .then(user => {
        if (user) {
          return user;
        } else {
          return User.create({
            email: googlePayload.email,
            username: googlePayload.name,
            picture: googlePayload.picture,
            password: process.env.DEFAULT_PASSWORD
          });
        }
      })
      .then(user => {
        res.status(200).json({ token: generateToken({ _id: user._id }) });
      })
      .catch(next);
  }
}

module.exports = UserController;
