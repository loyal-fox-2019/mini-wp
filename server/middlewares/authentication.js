const jwt = require('jsonwebtoken');
const userModel = require('../models/User');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.token;
    const userPayload = jwt.verify(token, process.env.JWT_KEY);
    // console.log(token);
    // console.log(userPayload.email);
    
    userModel.findOne({
      email: userPayload.email
    })
      .then((authenticatedUser) => {
        if (!authenticatedUser) {
          // throw new Error('You are not a registered user');
          console.log('errornya disini 1 authentications')
          res.status(400).json({
            message: 'You are not registered'
          });
        } else {
          req.userLogin = authenticatedUser
          next()
        }
      }).catch((err) => {
        throw err
      })
  } catch (err) {
    res.status(err.statusCode || 404).json({
      message: 'Invalid Token'
    })
  }
}