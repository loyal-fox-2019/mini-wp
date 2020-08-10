const { User } = require('../models');
const Token = require('../helpers/token');
const Hash = require('../helpers/hash');

class UserController {
  // register
  static register(req, res, next) {
    const { email, password } = req.body;

    User.create({ email, password })
      .then(user => {
        const { _id: userId } = user;

        res.status(201).json({
          message: `User has been successfully created!`,
          token: Token.generate({ userId })
        });
      })
      .catch(err => next(err));
  }

  // login
  static login(req, res, next) {
    const { email, password } = req.body;

    User.findOne({ email })
      .then(user => {
        if (!user) {
          res.status(403);
          throw new Error(`Email or password is invalid!`);
        } else {
          const { _id: userId, password: hash } = user;

          if (!Hash.verify(password, hash)) {
            res.status(403);
            throw new Error(`Email or password is invalid!`);
          } else {
            res.status(200).json({
              message: `User has found!`,
              token: Token.generate({ userId })
            });
          }
        }
      })
      .catch(err => next(err));
  }

  // read one
  static readOne(req, res, next) {
    const {
      userData: { userId }
    } = req;

    User.findById(userId)
      .populate('articles')
      .then(user => {
        if (!user) {
          res.status(404);
          throw new Error(`User not found!`);
        } else {
          const { username, email, avatar, articles } = user;
          res.status(200).json({
            username,
            email,
            avatar,
            articles
          });
        }
      })
      .catch(err => next(err));
  }

  // update
  // static update(req, res, next) {}

  // delete
  // static delete(req, res, next) {}
}

module.exports = UserController;
