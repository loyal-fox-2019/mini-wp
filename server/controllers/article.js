const Article = require('../models/article')

class ArticleController {
  static create (req, res, next) {
    const { title, content, tags, featured_image } = req.body,
      author = req.user._id
    Article.create({ title, content, tags, featured_image, author })
      .then(article => {
        res.send(article)
      })
      .catch(next)
  }
  static all (req, res, next) {
    Article.find()
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
      { title, content, tags, featured_image } = req.body
    Article.updateOne({ _id }, { title, content, tags, featured_image })
      .then(result => {
        res.send(result)
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