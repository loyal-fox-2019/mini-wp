const { Article } = require('../models');

class ArticleController {
  // create
  static create(req, res, next) {
    const {
      userData: { userId: authorId }
    } = req;
    const { title, content, tag, featuredImage } = req.body;

    // res.json({ authorId, ...req.body });
    Article.create({
      title,
      content,
      authorId,
      tag,
      featuredImage
    })
      .then(() =>
        res
          .status(201)
          .json({ message: `Article has successfully been created!` })
      )
      .catch(err => next(err));
  }

  // read all
  static readAll(req, res, next) {
    const {
      userData: { userId: authorId }
    } = req;

    const keys = Object.keys(req.query);

    keys.forEach(key => {
      req.query[key] = new RegExp(`${req.query[key]}`, 'i');
    });

    Article.find({ authorId, ...req.query })
      .populate('authorId')
      .then(articles => {
        if (articles.length === 0) {
          res.status(404);
          throw new Error(`User has no article!`);
        } else {
          res.status(200).json(articles);
        }
      })
      .catch(err => next(err));
  }

  // read one
  static readOne(req, res, next) {
    const {
      userData: { userId: authorId }
    } = req;

    const { articleId: _id } = req.params;

    Article.findOne({ _id, authorId })
      .then(article => {
        if (!article) {
          res.status(404);
          throw new Error(`Article not found!`);
        } else {
          res.status(200).json(article);
        }
      })
      .catch(err => next(err));
  }

  // update
  static update(req, res, next) {
    const {
      userData: { userId: authorId }
    } = req;

    const { articleId: _id } = req.params;

    Article.findOneAndUpdate({ _id, authorId }, req.body, {
      useFindAndModify: false
    })
      .then(article => {
        if (!article) {
          res.status(404);
          throw new Error(`Article not found!`);
        } else {
          res.status(200).json(article);
        }
      })
      .catch(err => next(err));
  }

  // delete
  static delete(req, res, next) {
    const {
      userData: { userId: authorId }
    } = req;

    const { articleId: _id } = req.params;

    Article.findOneAndDelete({ _id, authorId })
      .then(article => {
        if (!article) {
          res.status(404);
          throw new Error(`Article not found!`);
        } else {
          res.status(200).json(article);
        }
      })
      .catch(err => next(err));
  }
}

module.exports = ArticleController;
