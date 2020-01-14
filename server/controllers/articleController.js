const Article = require('../models/article')

class ArticleController {
    static getAll(req, res, next){
        Article.find()
            .then(results => {
                res.status(200).json(results)
            })
            .catch(err => {
                res.status(404).json({
                    message: 'Data not found!',
                    error: err.message
                })
            })
    }

    static postArticle(req, res, next){
        let data = {
            title: req.body.title,
            content: req.body.content,
            created_at: new Date()
        }
        Article.create(data)
            .then(result => {
                res.status(201).json({
                    message: 'Data created',
                    result
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Internal server error'
                })
            })
    }

    static deleteArticle(req, res, next){
        Article.remove({_id: req.params.id})
            .then(result => {
                res.status(200).json({
                    message: 'Data deleted'
                })
            })
            .catch(err => {
                res.status(404).json({
                    message: 'Data not found'
                })
            })
    }
}

module.exports = ArticleController