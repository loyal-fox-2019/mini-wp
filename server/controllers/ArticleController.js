const Article = require('../models/Article')

class ArticleController{
  static showAll(req, res, next){
    Article.find({author: req.userId})
      .populate('author', 'email -_id')
      .then((data) => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static showOne(req, res, next){
    Article.findById(req.params.id)
      .then((data) => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static create(req, res, next){
    let { title, content, tags} = req.body
    tags = JSON.parse(tags)
    let featured_image = req.body.file || ''
    let author = req.userId
    Article.create({ title, content, author, featured_image, tags})
      .then((article) => {
        res.status(201).json(article)
      })
      .catch(next)
  }

  static edit(req, res, next){
    const { title, content, tags } = req.body
    let featured_image = req.body.file
    const updateObj = { title, content, $set: {tags}, featured_image}
    const condition = { _id: req.params.id}
    Article.findOneAndUpdate(condition, updateObj, {new: true, omitUndefined: true})
      .then((article) => {
        res.status(200).json(article)
      })
      .catch(next)
  }

  static remove(req, res, next){
    Article.deleteOne({
      _id: req.params.id
    })
      .then((data) => {
        if (data.deletedCount == 0){
          throw ({message: `Article not found`})
        }
        else{
          res.status(200).json({message: 'Delete Success'})
        }
      })
      .catch(next)
  }

  static searchTag(req, res, next){
    Article.find({
      tags: req.params.tags,
      author: req.userId
    })
    .populate('author', 'email -_id')
    .then((data) => {
      res.status(200).json(data)
    })
  }
}

module.exports = ArticleController