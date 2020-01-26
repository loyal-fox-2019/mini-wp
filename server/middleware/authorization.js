'use strict'

const Article = require('../models/articles')

module.exports = function(req, res, next) {
    const userId = req.user
    // console.log(userId)
    console.log(req.params.id, 'ini id params di authorization')
    Article.findById({
        _id: req.params.id
    })
    .then(result => {
        console.log(result)
        if(!result){
            throw {status: 404, message: "article not found"}
        }
        if(result.userId !== userId) {
            throw {status: 403, message: "forbidden"}
        }
        else {

            next()
        }
    })
    .catch(next)
}