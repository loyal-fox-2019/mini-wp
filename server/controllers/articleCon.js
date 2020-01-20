const Article = require('../models/articleModel');

class ArticleController{
    static create(req,res,next){
        console.log(req.body)
        Article.create({
            title : req.body.title,
            content : req.body.content,
            imgUrl : req.body.file,
            author : req.body.author,
            status : req.body.status,
            tags : req.body.tags
        })
        .then((docs) => {
            console.log("masuk ke create ==================")
            console.log(docs)
            res.status(201).json({message : "Article created", docs})
        })
        .catch(err=>{
            console.log("masuk ke ERR ==================")
            console.log(err)
            res.status(400).json({message : "Bad request", err})
        });
    }

    static readPublished(req,res,next){
        Article.find({
            status : true
        })
        .then((docs) => {
            res.status(200).json({docs, user : req.userLoggedIn})
        })
        .catch(err=>{
            res.status(400).json({message : "Bad request", err})
        });
    }
    
    static readDrafts(req,res,next){
        console.log("masuk ke readDrafts")
        console.log(req.body.author)
        Article.find({
            status : false,
            author : req.body.author
        })
        .then((docs) => {
            res.status(200).json(docs)
        })
        .catch(err=>{
            res.status(400).json({message : "Bad request", err})
        });
    }

    static readId(req,res,next){
        Article.findOne({
            _id : req.params.id
        })
        .then((docs) => {
            res.status(200).json(docs)
        })
        .catch(err=>{
            res.status(400).json({message : "Bad request", err})
        });
    }

    static readTitle(req,res,next){
        Article.findOne({
            content : req.params.title
        })
        .then((docs) => {
            res.status(200).json(docs)
        })
        .catch(err=>{
            res.status(400).json({message : "Bad request", err})
        });
    }

    static update(req,res,next){
        console.log('======= ini di update controller')
        console.log(req.body)
        if(req.body.file){
            Article.updateOne({
                _id : req.params.id
            },{
                title : req.body.title,
                content : req.body.content,
                imgUrl : req.body.file,
                status : req.body.status,
                tags : req.body.tags
            })
            .then((docs) => {
                res.status(200).json({message : "updated", docs})
            })
            .catch(err=>{
                res.status(400).json({message : "Bad request", err})
            });
        }
        else{
            Article.updateOne({
                _id : req.params.id
            },{
                title : req.body.title,
                content : req.body.content,
                status : req.body.status,
                tags : req.body.tags
            })
            .then((docs) => {
                res.status(200).json({message : "updated", docs})
            })
            .catch(err=>{
                res.status(400).json({message : "Bad request", err})
            });
        }
    }

    static delete(req,res,next){
        Article.findByIdAndDelete(req.params.id)
        .then((docs) => {
            res.status(200).json({message:"deleted",docs})
        })
        .catch(err=>{
            res.status(400).json({message : "Bad request", err})
        });
    }
}

module.exports = ArticleController
