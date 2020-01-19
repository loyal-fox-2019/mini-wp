const Article = require('../models/article')

class ArticleController {
  static create (req, res, next) {
    const { title, content, featured_image } = req.body,
      tags = req.body.tags.split(','),
      author = req.user._id
    Article.create({ title, content, tags, featured_image, author })
      .then(article => {
        res.send(article)
      })
      .catch(next)
  }
  static all (req, res, next) {
    let query = {}
    if(req.query.tag) {
      query.tags = {$in: [req.query.tag]} 
    }
    if(req.query.search) {
      query.title = new RegExp(req.query.search,'i')
    }
    Article.find(query)
      .sort({createdAt: -1})
      .populate('author', 'username -_id')
      .then(articles => {
        res.send(articles)
      })
      .catch(next)
  }
  static userArticles (req, res, next) {
    let query = {
      author: req.user._id
    }
    if(req.query.tag) {
      query.tags = {$in: [req.query.tag]} 
    }
    if(req.query.search) {
      query.title = new RegExp(req.query.search,'i')
    }
    Article.find(query)
      .sort({createdAt: -1})
      .populate('author', 'username -_id')
      .then(articles => {
        res.send(articles)
      })
      .catch(next)
  }
  static delete (req, res, next) {
    const _id = req.params.id
    Article.deleteOne({ _id })
      .then(result => {
        res.send(result)
      })
      .catch(next)
  }
  static update (req, res, next) {
    const _id = req.params.id,
      { title, content, featured_image } = req.body,
      tags = req.body.tags.split(',')
    Article.updateOne({ _id }, { title, content, tags, featured_image })
      .then(result => {
        return Article.findById(_id)
      })
      .then(article => {
        res.send(article)
      })
      .catch(next)
  }
  static addTags (req, res, next) {
    const _id = req.params.id,
      { tags } = req.body
    Article.updateOne({ _id }, { $addToSet: { tags } })
      .then(result => {
        res.send(result)
      })
      .catch(next)
  }
  static removeTag (req, res, next) {
    const _id = req.params.id,
      remove = req.body.tag
    Article.updateOne({ _id }, { $pull: { tags: remove } })
      .then(result => {
        res.send(result)
      })
      .catch(next)
  }
}

module.exports = ArticleController