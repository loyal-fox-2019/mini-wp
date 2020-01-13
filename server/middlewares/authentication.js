'use strict';

const { verify } = require('../helpers/jwt');
const { User } = require('../models');

module.exports = (req, res, next) => {
  const { token } = req.headers;
  const payload = verify(token);
  const { id } = payload;
  User
    .findById(id)
    .then((user) => {
      if (!user) {
        next({ auth: true, statsu: 401, message: 'Unauthorized' });
      } else {
        req.token = payload;
        next();
      }
    })
    .catch(next);
};