"use strict"

const Article = require('../models/article')

class articleController {
    static findAll(req, res, next) {
        Article.find()
            .then((articles) => {
                res.status(200).json(articles)
            }).catch((err) => {
                next(err)
            });
    }

    static findOne(req, res, next) {
        Article.findOne({ _id: req.params.id })
            .then((article) => {
                if (article) {
                    res.status(200).json(article)
                } else {
                    next({
                        status: 404,
                        message: "data not found"
                    })
                }
            }).catch((err) => {
                next(err)
            });
    }

    static create(req, res, next) {
        Article.create({
            title: req.body.title,
            content: req.body.content,
            featured_image: req.body.featured_image,
            author: req.user._id
        })
            .then((article) => {
                res.status(201).json(article)
            }).catch((err) => {
                next(err)
            });
    }

    static update(req, res, next) {
        Article.updateOne({
            _id: req.params.id
        }, {
            title: req.body.title,
            content: req.body.content,
            featured_image: req.body.featured_image
        })
            .then((article) => {
                if (article.nModified !== 0) {
                    res.status(200).json("success update data")
                } else if (article.n === 0) {
                    next({
                        status: 404,
                        message: "data not found"
                    })
                } else {
                    next({
                        status: "no found",
                        message: "no found updated"
                    })
                }
            }).catch((err) => {
                next(err)
            });
    }

    static delete(req, res, next) {
        Article.deleteOne({
            _id: req.params.id
        })
            .then((data) => {
                if (data.deletedCount !== 0) {
                    res.status(200).json("success delete data")
                } else {
                    next({
                        status: 404,
                        message: "data not found"
                    })
                }
            }).catch((err) => {
                next(err)
            });
    }
}

module.exports = articleController