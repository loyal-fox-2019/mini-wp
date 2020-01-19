const Article = require('../models/Article')
const ObjecId = require('mongoose').Types.ObjectId

module.exports = class {
    static createArticle(req, res, next){
        Article
            .create({
                title: req.body.title,
                content: req.body.content,
                image: req.body.file,
                due_date: new Date(),
                createdAt: new Date(),
                userId: req.userLogin._id
            })
            .then((data) => {
                console.log(data)
                res.status(200).json(data)
            }).catch((err) => {
                res.status(500).json({
                    error:err
                })
            })
    }

    static findAllArticle(req,res,next){
        Article
            .find()
            .populate('userId')
            .exec()
            .then((articles) => {
                // console.log(articles);
                res.status(200).json(articles)
            }).catch((err) => {
                console.log(err)
                res.status(500).json({
                    error: err
                })
            })
    }

    static findUserArticle(req,res,next){
        Article
            .find({
                userId: ObjecId(req.userLogin._id)
            })
            .populate('userId')
            .exec()
            .then((articles) => {
                // console.log(articles);
                res.status(200).json(articles)
            }).catch((err) => {
                console.log(err)
                res.status(500).json({
                    error: err
                })
            })
    }

    static editArticle(req, res, next){
        Article
            .findByIdAndUpdate(req.params.articleId, {
                title: req.body.title,
                content: req.body.content,
                due_date: new Date()
            })
            .exec()
            .then((data) => {
                res.status(200).json(data)
            }).catch((err) => {
                res.status(500).json(err)
            });
    }

    static findOne(req, res, next){
        // console.log('a', req.body.articleId);
        
        Article
            .findById(req.params.articleId)
            .exec()
            .then((data)=> {
                res.status(200).json(data)
            })
            .catch( err => {
                next({
                    location: "findOne articleController",
                    status: 400,
                    error: err
                })
            })
    }
}