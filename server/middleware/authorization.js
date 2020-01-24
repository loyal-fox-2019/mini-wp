'use strict'

const Article = require('../models/articles')

module.exports = function(req, res, next) {
    const userId = req.decode.userId
    Article.findOne(req.params.id)
    .then(result => {
        if(result.id !== userId) {
            throw {status: 403, message: "forbidden"}
        }
        next()
    })
}