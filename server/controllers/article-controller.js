const Article = require('../models/article-model')

class Controller{
    static findall(req,res,next){
        Article.find()
        .then((data)=>{
            res.status(200).json(data)
        })
    }

    static create(req,res,next){
        Article.create(req.body)
        .then((data)=>{
            res.status(201).json(data)
        })
        .catch((err)=>{
            res.status(500).json(err)
        })
    }

    static deleteArticle(req,res,next){
        Article.deleteOne({
            '_id': req.params.id
        })
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch((err)=>{
            res.status(500).json(err)
        })
    }

    static updateArticle(req,res,next){
        Article.updateOne({'_id': req.params.id},req.body)
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch((err)=>{
            res.status(500).json(err)
        })
    }


}



module.exports = Controller