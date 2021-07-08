const Article = require('../models/article')

class ArticleController {
  static createArticle(req, res, next) {
    Article.create({
      title: req.body.title,
      content: req.body.content,
      author: req.payload.id,
      featuredImage: req.body.featuredImage,
      tags: req.body.tags.split(','),
    })
      .then(article => {
        res.status(201).json({ article })
      })
      .catch(next)
  }

  static getUserArticles(req, res, next) {
    Article.find({ author: req.payload.id })
      .then(articles => {
        res.json({ articles })
      })
      .catch(next)
  }

  static getAllArticles(req, res, next) {
    Article.find({ status: 'published' })
      .populate('author', 'username -_id')
      .then(articles => {
        res.json({ articles })
      })
      .catch(next)
  }

  static getArticlesByQuery(req, res, next) {
    let query = {}
    let regex = null

    if (!req.query.query) query = {}
    else {
      regex = new RegExp(req.query.query)
      query = { $or: [{ title: regex }, { content: regex }] }
    }

    Article.find(query)
      .populate('author', 'username -_id')
      .then(articles => {
        res.json({ articles })
      })
      .catch(next)
  }

  static getAllArticlesByTags(req, res, next) {
    Article.find({ tags: { $in: req.body.tags } })
      .populate('author', 'username -_id')
      .then(articles => {
        res.json({ articles })
      })
      .catch(next)
  }

  static editArticle(req, res, next) {
    req.article.title = req.body.title || req.article.title
    req.article.content = req.body.content || req.article.content
    req.article.featuredImage =
      req.body.featuredImage || req.article.featuredImage
    req.article.tags = req.body.tags || req.article.tags
    req.article.status = req.body.status || req.article.status

    req.article
      .save()
      .then(() => {
        res.json({ message: 'Article edited' })
      })
      .catch(next)
  }

  static deleteArticle(req, res, next) {
    Article.findOneAndDelete({ _id: req.params.articleId })
      .then(article => {
        res.json({ message: 'Article deleted' })
      })
      .catch(next)
  }
}

module.exports = ArticleController
