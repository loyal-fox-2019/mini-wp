'use strict';
const { Article } = require('../models');

module.exports = (req, res, next) => {
  const { articleId } = req.params;
  const { id } = req.token;
  Article
    .findOne({ _id: articleId })
    .select('author')
    .then((article) => {
      if (article.author == id) next();
      else {
        next({ auth: true, statsu: 403, message: 'Forbidden' });
      }
    })
    .catch(next);
};
