const { Article } = require('../models');

class ArticleController {
  static create(req, res, next) {
    const { title, content } = req.body;
    Article.create({ title, content })
      .then(article => res.status(200).json(article))
      .catch(err => next(err));
  }

  static readAll(req, res, next) {
    console.log(`OK`);
    Article.find()
      .then(articles => {
        if (articles.length === 0) {
          const err = new Error('Empty!');
          err.httpStatus = 404;
          throw err;
        } else {
          res.status(200).json(articles);
        }
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  }

  static readOne(req, res, next) {
    const { id } = req.params;
    Article.findById(id)
      .then(article => {
        if (!article) {
          const err = new Error('Article not found!');
          err.httpStatus = 404;
          throw err;
        } else {
          res.status(200).json(article);
        }
      })
      .catch(err => next(err));
  }

  static update(req, res, next) {
    const { id } = req.params;
    Article.findByIdAndUpdate(id, req.body)
      .then(article => {
        if (!article) {
          const err = new Error(`Article not found!`);
          err.httpStatus = 404;
          throw err;
        } else {
          res.status(200).json(article);
        }
      })
      .catch(err => next(err));
  }

  static destroy(req, res, next) {
    const { id } = req.params;
    Article.findByIdAndDelete(id)
      .then(article => res.status(200).json(article))
      .catch(err => next(err));
  }
}

module.exports = ArticleController;
