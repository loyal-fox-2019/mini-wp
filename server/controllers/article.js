const Model = require('../models/article')

class Article {
    static addArticle(req, res, next) {
        Model.create({
            title: req.body.title,
            content: req.body.content,
            thumbnail: req.body.thumbnail,
            author: req.loginData.id
        })
            .then(created => {
                res.status(201).json(created)
            })
            .catch(next)
    }
    static allArticle(req, res, next) {
        let err = {}
        Model.find({ author: req.loginData.id }).populate('author', 'name')
            .then(articles => {
                if (!articles) {
                    err.name = 'No Article'
                    err.message = 'Article Not Found'
                    throw err
                } else {
                    res.status(200).json(articles)
                }
            })
            .catch(next)
    }
    static findArticleById(req, res, next) {
        let err = {}
        Model.findById(req.params.id).populate('author', 'name')
            .then(articles => {
                if (!articles) {
                    err.name = 'No Article'
                    err.message = 'Article Not Found'
                    throw err
                } else {
                    res.status(200).json(articles)
                }
            })
            .catch(next)
    }

    static updateArticle(req, res, next) {
        Model.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            content: req.body.content
        })
            .then(() => {
                res.status(200).json({ message: 'Article Successfully Updated' })
            })
            .catch(next)
    }
    static deleteArticle(req, res, next) {
        Model.findByIdAndDelete(req.params.id)
            .then(() => {
                res.status(200).json({ message: 'Article Successfully Deleted' })
            })
            .catch(next)
    }
}

module.exports = Article