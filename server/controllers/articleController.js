const ArticleModel = require('../models/article')

class ArticleController {
    static findAll(req,res,next){
        ArticleModel.find()
        .then(articles=>{
            res.status(200).json(articles)
        })
        .catch(next)
    }

    static create(req,res,next){
        ArticleModel.create(req.body)
        .then(created=>{
            res.status(201).json(created)
        })
        .catch(next)
    }

    static update(req,res,next){
        ArticleModel.findByIdAndUpdate(req.params.id, req.body)
        .then(updated=>{
            res.status(200).json(updated)
        })
        .catch(next)
    }

    static delete(req,res,next){
        ArticleModel.findByIdAndDelete(req.params.id)
        .then(deleted=>[
            res.status(200).json(deleted)
        ])
        .catch(next)
    }
}

module.exports = ArticleController