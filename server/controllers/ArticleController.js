'use strict';

const Article = require('../models/article');

class ArticleController {
    static read(req, res, next) {
        Article.find()
        .then(articles => {
            res.status(200).json({
                message: "OK",
                data: articles
            })
        })
        .catch(error => {
            next(error);
        })
    }

    static create(req, res, next) {
        const newArticle = {
            title: req.body.title,
            content: req.body.content,
        }
        Article.create(newArticle)
        .then(article => {
            res.status(201).json({
                message: "New article has been created",
                data: article
            });
        })
        .catch(error => {
            next(error);
        })
    }

    static delete(req, res, next) {
        Article.deleteOne({_id: req.body.article_id})
        .then(result => {
            res.status(200).json({
                message: "OK",
                data: result
            })
        }) 
        .catch(error => {
            next(error);
        })
    }

    static findOne(req, res, next) {
        Article.findOne({_id: req.params.id})
        .then(article => {
            res.status(200).json({
                message: "OK",
                data: article
            })
        })
        .catch(error => {
            next(error);
        })
    }

    static update(req, res, next) {
        const updateArticle = {
            title: req.body.title,
            content: req.body.content
        }
        Article.updateOne({_id: req.params.id}, updateArticle)
        .then(update => {
            console.log(update);
        })
        .catch(error => {
            console.log(error);
        })
    }
}

module.exports = ArticleController;