"use strict"

const Article = require('../models/article');

class ArticleCtr {
    static create(req, res, next) {
        Article.create({
            title: req.body.title,
            content: req.body.content
        })
        .then((article) => {
            res.status(201).json(article)
        })
        .catch(next);
    }

    static read(req, res, next) {
        Article.find()
        .then((articles) => {
            res.status(200).json(articles)
        })
        .catch(next)
    }

    static update(req, res, next) {
        const id = req.params.id;

        Article.findByIdAndUpdate(id, {
            title: req.body.title,
            content: req.body.content
        })
        .then(() => {
            Article.findById(id)
            .then((updated) => {
                res.status(200).json(updated)
            })
            .catch(next)
        })
        .catch(next)
    }

    static delete(req, res, next) {
        const id = req.params.id;

        Article.findByIdAndDelete(id)
        .then((result) => {
            res.status(200).json(result)
        })
        .catch(next)
    }
}

module.exports = ArticleCtr;