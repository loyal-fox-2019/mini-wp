'use strict'

const Article = require('../models/articles')

class articleController {

    static create(req, res, next){
        const obj = {
            title: req.body.title,
            content: req.body.content
        }

        Article.create(obj)
        .then(article => {
            res.status(201).json({message: 'create article success'})
        })
        .catch(next)
    }

    static showAll(req, res, next) {
        Article.find()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
    }

    static delete(req, res, next){
        Article.findByIdAndDelete(req.params.id)
        .then(result => {
            if(!result){
                throw ({status: 404, message:'article not found'})
            }
            else {
                res.status(200).json({message: 'delete success'})
            }
        })
        .catch(next)
    }

    static update(req, res, next){
        const obj = {
            title: req.body.title,
            content: req.body. content
        }
        Article.findByIdAndUpdate(obj)
        .then(result => {
            if(!result){
                throw ({status: 404, message:'article not found'})
            }
            else {
                res.status(200).json({message: 'update success'})
            }
        })
        .catch(next)
    }
}

module.exports = articleController