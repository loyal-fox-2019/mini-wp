const Article = require('../models/article')
const User = require('../models/user')

class ArticleController{
    static findAll(req,res,next){
        // console.log('masuk ga', req.payload._id)
        Article.find({author: req.payload._id}).populate('author', '-password')
        .then(result=>{
            if(result){
                // console.log(result,'find all ==========================')
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
        // console.log(req.payload, 'controller create')
        User.findOne({
            email: req.payload.email
        })
        .then(user=>{
            return Article.create({
                    title:req.body.title,
                    content: req.body.content,
                    created_at: new Date(),
                    picture: req.body.picture,
                    author: user._id
                })
        })
        .then(article=>{
            // console.log(article)
            res.json({
                title: article.title,
                content: article.content,
                created_at: article.created_at,
                picture: article.picture,
                author: article.author
            })
        })
        .catch(err=>{
            res.json({
                error: err.message
            })
        })
    }
    static delete(req,res,next){
        // console.log('masuk delete', req.params)
        Article.findByIdAndDelete({_id: req.params.id}).populate('author', '-password')
        .then(result=>{
            
            res.json({
                _id: result._id,
                title: result.title,
                content: result.content,
                created_at: result.created_at,
                picture: result.picture,
                author: result.author
            })
        })
        .catch(err=>{
            res.json({
                message:err
            })
        })
    }
    static update(req,res,next){
        // console.log(req.body,'di controller update')
        Article.findByIdAndUpdate({_id: req.params.id},{
            title: req.body.title,
            content: req.body.content,
            created_at: req.body.created_at,
            picture: req.body.picture
        }).populate('author', '-password')
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
        Article.findById({_id: req.params.id}).populate('author', '-password')
        .then(result=>{
            if(result){
                res.json({
                    _id: result._id,
                    title: result.title,
                    content: result.content,
                    created_at: result.created_at,
                    picture: result.picture,
                    author: result.author
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