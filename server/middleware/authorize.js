"use strict"

const Article = require('../models/article')

function authorize(req, res, next) {
    Article.find({ author: req.user.id })
        .then((article) => {
            if (!article) {
                next({
                    status: 404,
                    message: "data not found"
                })
            } else if (article.author === req.author) {
                next()
            } else {
                next({
                    status: 401,
                    message: "not authorized"
                })
            }
        }).catch((err) => {
            next(err)
        });
}

module.exports = authorize