const Article = require('../models/article')

class ArticleController{
    static findAll(req,res,next){
        Article.find()
        .then(result=>{
            if(result){
                res.json({
                    result
                })
            }else{
                res.json({
                    message: 'there is no article'
                })
            }
        })
        .catch(err=>{
            res.json({
                message: err
            })
        })
    }
    static create(req,res,next){
        // console.log(req.body)
        Article.create({
            title:req.body.title,
            content: req.body.content,
            created_at: req.body.created_at
        })
        .then(result=>{
            // console.log(result)
            res.json({
                title: result.title,
                content: result.content,
                created_at: result.created_at
            })
        })
        .catch(err=>{
            res.json({
                message: err
            })
        })
    }
    static delete(req,res,next){
        // console.log('masuk delete', req.params)
        Article.findByIdAndDelete(req.params.id)
        .then(result=>{
            
            res.json({
                result
            })
        })
        .catch(err=>{
            res.json({
                message:err
            })
        })
    }
    static update(req,res,next){
        Article.findByIdAndUpdate(req.params.id,{
            title: req.body.title,
            content: req.body.content,
            created_at: req.body.created_at
        })
        .then(result=>{
            res.json({
                result
            })
        })
        .catch(err=>{
            res.json({
                message:err
            })
        })
    }
    static findOne(req,res,next){
        Article.findById(req.params.id)
        .then(result=>{
            if(result){
                res.json({
                    result
                })
            }else{
                res.json({
                    message: 'article not found'
                })
            }
        })
        .catch(err=>{
            res.json({
                message: err
            })
        })
    }
}

module.exports = ArticleController