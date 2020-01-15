'use strict';
const { Article } = require('../models');

class ArticleController {
  static async postNewArticle(req, res, next) {
    const { title, content, featured_image, tags } = req.body;
    const { id } = req.token;
    const doc = {
      title,
      content,
      featured_image,
      author: id,
      tags
    };
    try {
      const response = await Article.create(doc)
      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async getMyArticle(req, res, next) {
    const { id } = req.token;
    try {
      const myArticle = await Article.find({ author: id })
      res.status(200).json(myArticle);
    } catch (err) {
      next(err);
    }
  }

  static async addTags(req, res, next) {
    const { tags } = req.body;
    const { articleId } = req.params;
    const tagsValue = tags.split(',')
    try {
      const duplicate = await Article.findOne({ _id: articleId })
      const isDuplicate = tagsValue.filter(function (tag, i) {
        return duplicate.tags.indexOf(tag) == -1
      })
      if (isDuplicate.length === 0) {
        next({ auth: true, status: 400, message: `Your article already contains those tags` });
      } else {
        const response = await Article.updateOne({ _id: articleId }, { $push: { tags: { $each: isDuplicate } } })
        res.status(200).json({ message: 'Tag(s) added' })
      }
    } catch (err) {
      next(err);
    }
  }

  static async getArticles(req, res, next) {
    try {
      const response = await Article.find().sort({ createdAt: -1 }).select('title _id tags featured_image createdAt').populate({ path: 'author', select: '-password -_id -email' })
      res.status(200).json(response);
    } catch(err) {
      next(err);
    };
  }

  static async searchArticles(req, res, next) {
    const { title, f } = req.query;
    try {
      const response = await Article.find({ title: { $regex: title, $options: 'i' }, tags: { $regex: f, $options: 'i' } }).sort({ createdAt: -1 }).select('title _id tags featured_image createdAt').populate({ path: 'author', select: '-password -_id -email' })
      res.status(200).json(response);
    } catch (err) {
      next(err);
    };
  }

  static async readArticle(req, res, next) {
    const { articleId } = req.params;
    try {
      const response = await Article.findOne({ _id: articleId }).populate({ path: 'author', select: '-password -_id -email' });
      res.status(202).json(response)
    } catch (err) {
      next(err);
    }
  }

  static async removeArticle(req, res, next) {
    const { articleId } = req.params;
    try {
      const response = await Article.deleteOne({ _id: articleId })
      res.status(200).json({ message: 'Article deleted' });
    } catch (err) {
      next(err);
    }
  }

  static async updateArticle(req, res, next) {
    const { articleId } = req.params;
    try {
      const response = await Article.updateOne({ _id: articleId }, req.body)
      res.status(200).json({ message: 'Article updated!' })
    } catch (err) {
      next(err);
    }
  }
};

module.exports = ArticleController;
