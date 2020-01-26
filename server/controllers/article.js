'use strict'

const Article = require('../models/articles')

class articleController {

    static create(req, res, next){
        // console.log(req.user)
        const obj = {
            title: req.body.title,
            content: req.body.content,
            userId: req.user
        }

        Article.create(obj)
        .then(article => {
            res.status(201).json({message: 'create article success'})
        })
        .catch(next)
    }
    static showOne(req, res, next) {
        Article.findOne({
            _id: req.params.id
        })
        .then(result => {
            if(!result) {
                throw ({status: 404, message:"article not found"})
            }
            else {
                res.status(200).json(result)
            }
        })
        .catch(next)
    }

    static showAll(req, res, next) {
        const userId = req.user
        Article.find()
        .then(result => {
            res.status(200).json({articles: result, userId: userId})
        })
        .catch(next)
    }

    static delete(req, res, next){
        const id = req.params.id
        console.log(id, 'ini id params d controller')
        Article.findByIdAndRemove(id)
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
        console.log('masuk update controller')
        
        const obj = {
            title: req.body.title,
            content: req.body.content
        }
        const id = req.params.id
        console.log(id, 'ini id params d controllers')
        Article.findByIdAndUpdate(id, obj)
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