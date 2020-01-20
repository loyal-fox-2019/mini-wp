const User = require('../models/user')
const { compareHash } = require('../helpers/bcrypt');
const { generateToken } = require('../middlewares/jwt');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_TOKEN);

module.exports = class UserController {
  static create(req, res, next) {
    const { name, email, password } = req.body;
    User.create({
      name,
      email,
      password
    })
      .then(user => {
        let payload = {
            id : user._id
          };
          let token = generateToken(payload);
          res.status(200).json({ token: token, name: user.name });
        })
      .catch(next);
  }

  static login(req, res, next) {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          next({ status: 400, message: 'Email or password wrong'});
        } else if (compareHash(req.body.password, user.password)) {
          let payload = {
            id : user._id
          };
          let token = generateToken(payload);
          res.status(200).json({ token: token, name: user.name });
        } else {
          next({ status: 400, message: 'Email or password wrong'});
        }
      })
      .catch(next);
  }

  static googleSignIn(req, res, next) {
    let email = null;
    client.verifyIdToken({
        idToken: req.body.id_token,
        audience: process.env.GOOGLE_TOKEN
    })
    .then(ticket => {
        email = ticket.payload.email;
        return User.findOne({
            email
        });
    })
    .then(user => {
        if(user) {
            return user;
        } else {
            return User.create({
                name: email,
                email: email,
                password: 'default'
            });
        }
    })
    .then(user => {
        const token = jwt.generateToken(user._id);
        res.status(200).json({ token, name: user.name });
    })
    .catch(next);
  }
}