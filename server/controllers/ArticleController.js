'use strict';

const Article = require('../models/article');

class ArticleController {
    static create(req, res, next) {
        const title = req.body.title;
        const content = req.body.content;
        const file = req.body.file;
        Article.create({
            title,
            content,
            file
        })
        .then(article => {
            res.status(201).json(article);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
    }

    static find(req, res, next) {
        Article.find()
        .then(articles => {
            res.status(200).json(articles);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
    }

    static findOne(req, res, next) {
        Article.findOne({
            _id: req.params.id 
        })
        .then(article => {
            res.status(200).json(article);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
    }

    static updateOne(req, res, next) {
        Article.updateOne(
            {
                _id: req.params.id
            },
            {
                title: req.body.title,
                content: req.body.content
            }
        )
        .then(article => {
            res.status(200).json(article);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
    }

    static deleteOne(req, res, next) {
        Article.deleteOne({
            _id: req.params.id
        })
        .then(deletedArticle => {
            res.status(200).json(deletedArticle);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
    }
}

module.exports = ArticleController;