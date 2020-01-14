const Model = require('../models/article')

class Article {
    static create(req, res, next) {
        Model.create({
            title: req.body.title,
            content: req.body.content
        })
            .then(success => {
                res.status(201).json(success)
            })
            .catch(next)
    }
    static findAll(req, res, next) {
        Model.find()
            .then(articles => {
                res.status(200).json(articles)
            })
            .catch(next)
    }
    static delete(req, res, next) {
        Model.findByIdAndDelete(req.params.id)
            .then(() => {
                res.status(200).json({ Message: 'Successfully Deleted Articles' })
            })
            .catch(next)
    }
    static updateArticle(req, res, next) {
        Model.findByIdAndUpdate(req.params.id, { content: req.body.content })
            .then(() => {
                res.status(200).json({ Message: 'Successfully updated Articles' })
            })
            .catch(next)
    }
    static findById(req, res, next) {
        Model.findById(req.params.id)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
    static updateAll(req, res, next) {
        Model.findByIdAndUpdate(req.params.id, { title: req.body.title, content: req.body.content })
            .then(() => {
                res.status(200).json({ Message: 'Successfully updated Articles' })
            })
            .catch(next)
    }
}

module.exports = Article