const Post = require('../models/Post')

class PostController {
    static create(req, res, next){
        console.log(req.body.image)
        Post
            .create({
                title: req.body.title,
                article: req.body.article,
                categories: req.body.categories,
                image: req.body.image,
                author: 'dzakki'
            })
            .then(post => {
                res.status(201).json({
                    post
                })
            })
            .catch(next)
    }

    static getAll(req, res, next){
        Post
            .find()
            .then(posts => {
                res.status(200).json({
                    posts
                })
            })
            .catch(next)
    }
    static get(req, res, next) {
        Post
            .findOne({
                _id: req.params.id
            })
            .then(posts => {
                res.status(200).json({
                    posts
                })
            })
            .catch(next)
    }

    static update(req, res, next){
        console.log(req.body)
        Post
            .updateOne({
                _id: req.params.id
            },{
                title: req.body.title,
                article: req.body.article,
                categories: req.body.categories,
                image: req.body.image
            })
            .then(results => {
                return Post
                        .findOne({
                            _id: req.params.id
                        })
            })
            .then(post => {
                res.status(200).json({
                    post
                })
            })
            .catch(next)
    }

    static delete(req, res, next){
        Post
            .deleteOne({
                _id: req.params.id
            })
            .then(post => {
                res.status(200).json({
                    post
                })
            })
            .catch(next)
    }
}

module.exports = PostController