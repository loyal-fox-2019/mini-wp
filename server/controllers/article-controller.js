const Article = require('../models/article-model')

class Controller{
    static findall(req,res,next){
        Article.find({
            author: req.userId.userId
        })
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch((err)=>{
            next(err)
        })
    }

    static create(req,res,next){
        let data = {
            title: req.body.title,
            content: req.body.content,
            created_at: new Date(),
            image: req.body.image,
            author: req.userId.userId,
            tag: req.body.tag.split(',')
        }
        Article.create(data)
        .then((data)=>{
            res.status(201).json(data)
        })
        .catch(next)
    }

    static deleteArticle(req,res,next){
        Article.deleteOne({
            '_id': req.params.id,
            author: req.userId.userId
        })
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static updateArticle(req,res,next){
        let data = {
            title: req.body.title,
            content: req.body.content,
            image: req.body.image,
            tag: req.body.tag.split(',')
        }
        Article.updateOne({
            '_id': req.params.id,
            author: req.userId.userId
        },data)
        .then((data)=>{
            return Article.findOne({
                '_id':req.params.id,
                author: req.userId.userId
            })
        })
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch(next)
    }

}

module.exports = Controller