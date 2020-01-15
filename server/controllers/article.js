const { Article } = require('../models')
const { tagFormatter } = require('../helpers/tagFormatter')

class ArticleController {
  static addPost(req, res, next) {
    let author = req.decoded.id
    let { title, content, tags, featured_image } = req.body
    tags = tagFormatter(tags)
    Article.create({
      title,
      content,
      featured_image,
      tags,
      author
    })
      .then(article => {
        res.status(201).json(article)
      })
      .catch(next)
  }

  static findAllArticles(req, res, next) {
    Article.find()
      .populate('author', ['username', 'email'])
      .then(articles => {
        res.status(200).json(articles)
      })
      .catch(next)
  }

  static findOneArticle(req, res, next) {
    Article.findById(req.params.articleId)
      .populate('author', ['username', 'email'])
      .then(article => {
        if (article) {
          res.status(200).json(article)
        } else {
          next({ statusCode: 404, message: 'Article not found' })
        }
      })
      .catch(next)
  }

  static updateArticle(req, res, next) {
    const { title, content, tags, featured_image } = req.body
    const update = {}
    title && (update.title = title)
    content && (update.content = content)
    featured_image && (update.featured_image = featured_image)
    tags ? (update.tags = tagFormatter(tags)) : (update.tags = [])
    Article.findByIdAndUpdate(req.params.articleId,
      update,
      { new: true, omitUndefined: true })
      .then(article => {
        console.log(article)
        res.status(200).json(article)
      })
      .catch(next)
  }

  static deleteArticle(req, res, next) {
    Article.findByIdAndDelete(req.params.articleId)
      .then(article => {
        if (article) {
          res.status(200).json({
            message: 'Successfully deleted'
          })
        } else {
          next({ statusCode: 404, message: 'Article not found' })
        }
      })
      .catch(next)
  }
}

module.exports = ArticleController