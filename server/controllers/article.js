const articleModel = require('../models/article');
const ObjectId = require('mongoose').Types.ObjectId;

class Article {
  static getAllArticles(req, res, next) {
    articleModel.find()
      .then((articles) => {
        res.status(200).json({articles});
      }).catch(next);
  }

  static uploadImage(req, res, next) {
    const filename = req.body.file;
    res.status(200).json({filename});
  }

  static addArticle(req, res, next) {
    const {title, content, featured_image, tags, status} = req.body;

    articleModel.create({
      title,
      content,
      author: req.userLogin._id,
      featured_image: featured_image || '',
      tags: tags || '',
      status: status == 'publish' || status == 'draft' ? status : 'draft',
      slug: title.replace(/[^A-Z0-9]/ig, "-"),
      created_at: new Date()
    })
      .then((newArticle) => {
        res.status(201).json({newArticle});
      }).catch(next);
  }

  static getArticleById(req, res, next) {
    console.log(req.params);
    
    articleModel.findById(req.params.articleId)
      .then((article) => {
        res.status(200).json(article);
      }).catch(next);
  }

  static updateArticle(req, res, next) {
    articleModel.update({
      _id: ObjectId(req.params.articleId)
    }, req.body)
      .then((article) => {
        res.status(200).json({article});
      }).catch(next);
  }

  static deleteArticle(req, res, next) {
    articleModel.deleteOne({
      _id: Object(req.params.articleId)
    })
      .then((article) => {
        res.status(200).json({article});
      }).catch(next);
  }

  static getArticleByTagName(req, res, next) {
    const regex = new RegExp(req.params.tagName, 'g');

    articleModel.find({
      tags: {
        $in: [regex]
      }
    })
      .then((articles) => {
        res.status(200).json({articles});
      }).catch(next);
  }

  static addTagNameToArticle(req, res, next) {
    articleModel.update({
      _id: ObjectId(req.params.articleId)
    }, {
      $push: {
        tags: req.body.tagName
      } 
    })
      .then((article) => {
        res.status(201).json(article);
      }).catch(next);
  }

  static deleteTagNameFromArticle(req, res, next) {
    articleModel.update({
      _id: ObjectId(req.params.articleId)
    }, {
      $pullAll: {
        tags: [req.body.tagName]
      } 
    })
      .then((article) => {
        res.status(200).json(article);
      }).catch(next);
  }
}

module.exports = Article;
