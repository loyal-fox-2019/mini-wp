'use strict';

const Article = require('../models/article');

class ArticleController {
    static create(req, res, next) {
        const title = req.body.title;
        const content = req.body.content;
        const file = req.body.file;
        const UserId = req.userLoggedIn.id;
        Article.create({
            title,
            content,
            file,
            UserId
        })
        .then(article => {
            res.status(201).json(article);
        })
        .catch(next);
    }

    static find(req, res, next) {
        const UserId = req.userLoggedIn.id;
        Article.find({
            UserId
        })
        .then(articles => {
            res.status(200).json(articles);
        })
        .catch(next);
    }

    static findOne(req, res, next) {
        Article.findOne({
            _id: req.params.id 
        })
        .then(article => {
            res.status(200).json(article);
        })
        .catch(next);
    }

    static updateOne(req, res, next) {
        let id = req.params.id;
        Article.updateOne(
            {
                _id: id
            },
            {
                title: req.body.title,
                content: req.body.content
            }
        )
        .then(article => {
            res.status(200).json(article);
        })
        .catch(next);
    }

    static deleteOne(req, res, next) {
        Article.deleteOne({
            _id: req.params.id
        })
        .then(deletedArticle => {
            res.status(200).json(deletedArticle);
        })
        .catch(next);
    }
}

module.exports = ArticleController;