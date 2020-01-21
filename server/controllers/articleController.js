const Article = require('../models/article')

class ArticleController {
    static getAll(req, res, next){
        console.log('Masuk gan')
        Article.find({user_id: req.loggedIn.id})
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
        console.log('Masuk post article')
        let data = {
            title: req.body.title,
            author: req.loggedIn.name,
            description: req.body.description,
            content: req.body.content,
            featured_image: req.body.featured_image,
            user_id: req.loggedIn.id,
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

    static editArticle(req, res, next){
        let id = req.params.id
        let data = {
            title: req.body.title,
            description: req.body.description,
            content: req.body.content,
            featured_image: req.body.featured_image
        }
        console.log(data)
        Article.updateOne({_id: id}, data)
            .then(result => {
                res.status(200).json({
                    message: 'Data updated',
                    result
                })
            })
            .catch(err => {
                res.status(404).json({
                    message: 'Data not found!'
                })
            })
    }
}

module.exports = ArticleController