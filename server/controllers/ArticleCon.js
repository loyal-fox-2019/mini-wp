'use strict'
const Article = require('../models/Article')

class ArticleCon
 {

    static findAll(req, res, next){
        Article.find({
            author: req.user._id
        })
        .populate('author')
        .then(article => {
            res.status(200).json(article)
        })
        .catch(next)
    }

    static findOne(req, res, next){
        let id = req.params.id
        Article.findById(id)
        .then(article => {
            res.status(200).json(article)
        })
        .catch(next)
    }

    static addArticle(req, res, next){
        let img = req.body.image
        if(!img){
            img = 'http://www.coraf.org/wp-content/themes/consultix/images/no-image-found-360x250.png'
        }

        let data = {
            title: req.body.title,
            content: req.body.content,
            image: img,
            author: req.user._id
        }

        if(req.body.tags !== ''){
            const str = req.body.tags
            const arr = str.split(',')
            data.tags = arr
        }

        Article.create(data)
        .then(article =>{
            res.status(201).json(article)
        })
        .catch(next)
    }

    static deleteArticle(req, res, next){
        const id = req.params.id      
        Article.deleteOne({_id : id})
        .then(article =>{
            res.status(200).json(article)
        })
        .catch(next)
    }

    static updateArticle(req, res, next){
        Article.updateOne({
            _id : req.params.id
        },req.body)
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static updateStar(req, res, next){
        const id = req.params.id
        let star = true
        Article.updateOne({_id : id}, {star})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(next)
    }
}

module.exports = ArticleCon
