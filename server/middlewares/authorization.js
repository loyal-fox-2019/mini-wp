const ObjectId = require('mongoose').Types.ObjectId;
const articleModel = require('../models/article');

module.exports = (req, res, next) => {
  const {userLogin} = req;

  articleModel.findOne({
    _id: ObjectId(req.params.articleId)
  }).populate('author')
    .then((article) => {
      if (!article) {
        let err = new Error('Error message');
        err.statusCode = 404;
        err.message = 'Article not found';
        throw err;
      } else if (!article.author._id.equals(req.userLogin._id) || article.author.email != req.userLogin.email) {
        let err = new Error('Error message');
        err.statusCode = 401;
        err.message = 'You are not authorized accessing this data';
        throw err;
      } else {
        next();
      }
    }).catch((err) => {
      res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error'
      });
    });
};