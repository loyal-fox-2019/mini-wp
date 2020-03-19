const { Article } = require("../models/index");
const { ObjectId } = require("mongoose").Types;

class ArticleController {
  static create(req, res, next) {
    const newArticle = {
      title: req.body.title,
      content: req.body.content,
      featured_image: req.body.image,
      author: req.userInfo.fullname,
      userId: req.userInfo.id
    };
    // res.json(newArticle);
    Article.create(newArticle)
      .then(result => {
        res.status(201).json({
          msg: "Data Successfully Saved",
          data: result
        });
      })
      .catch(err => {
        next(err);
      });
  }

  static findAll(req, res, next) {
    Article.find()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        next(err);
      });
  }

  static myArticle(req, res, next) {
    Article.find({
      userId: ObjectId(req.userInfo.id)
    })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        next(err);
      });
  }

  static update(req, res, next) {
    const article = {
      title: req.body.title,
      content: req.body.content,
      featured_image: req.body.image,
      author: req.userInfo.fullname,
      userId: req.userInfo.id
    };
    Article.findByIdAndUpdate(
      {
        _id: ObjectId(req.params.id)
      },
      article
    )
      .then(result => {
        res.status(200).json({
          msg: "Data Successfully updated",
          result
        });
      })
      .catch(err => {
        next(err);
      });
  }

  static delete(req, res, next) {
    Article.findByIdAndDelete({
      _id: ObjectId(req.params.id)
    })
      .then(result => {
        res.status(200).json({
          msg: "Data Successfully deleted",
          result
        });
      })
      .catch(err => {
        next(err);
      });
  }
}

module.exports = ArticleController;
