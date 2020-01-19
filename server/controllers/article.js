'use strict'
const { Article } = require('../models')

class articleController {
  static createArticle (req, res, next) {
    const { title, content, image, tags } = req.body
    Article
      .create({
        title, content, featured_image: image, tags, author: req.decoded.id
      })
      .then(article => {
        res.status(201).json({
          message: "Success to create new article"
        })
      })
      .catch(next)
  }

  static readOneArticle (req, res, next) {
    const id = req.params.id

    Article
      .findOne({_id: id})
      .populate('author', '-password')
      .then(article => {
        res.status(200).json(article)
      })
      .catch(next)
  }

  static readUserArticle (req, res, next) {
    Article
      .find({ author: req.decoded.id })
      .populate('author', '-password')
      .sort({ createdAt: -1 })
      .then(articles => {
        res.status(200).json(articles)
      })
      .catch(next)
      console.log('read all')
    }
    
    static readAllArticle (req, res, next) {
      Article
      .find()
      .populate('author', '-password')
      .sort({ createdAt: -1 })
      .then(articles => {
        res.status(200).json(articles)
      })
      .catch(next)
    console.log('read all')
  }

  static updateArticle (req, res, next) {
    const _id = req.params.id
    const { title, content, image, tags } = req.body
    const value = { title, content, featured_image: image, tags }

    Article
      .findByIdAndUpdate(_id, value, { new: true, omitUndefined: true })
      .then( article => {
        res.status(200).json(article)
      })
      .catch(next)
  }

  static deleteArticle (req, res, next) {
    const _id = req.params.id

    Article
      .findByIdAndDelete(_id)
      .then(article => {
        res.status(201).json({
          message: "Success to delete article"
        })
      })
    console.log('delete')
  }

  static searchArticle (req, res, next) {
    const { content } = req.query
    const articleSearch = []
    Article
      .find()
      .populate('author', '-password')
      .then(articles => {
        
        for (let i = 0; i < articles.length; i++) {
          for (let j = 0; j < articles[i].tags.length; j++) {
            if(articles[i].tags[j] == content.toLowerCase()) {
              articleSearch.push(articles[i])
              break
            }
          }
        }
        
        res.status(200).json(articleSearch)
      })
      .catch(next)
  }
}

module.exports = articleController