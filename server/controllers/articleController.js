const article = require('../models/articles')

class ArticleController {
    static getAllArticles(req, res, next){
        article.find({})
        .then(articles=>{
            res.status(200).json(articles)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    static createArticle(req, res, next){
        // console.log(req.body)
        article.create({
           title: req.body.title,
           content: req.body.content,
           image_url: req.body.image,
           created_at: new Date() 
        })
        .then(newArticle=>{
            // console.log(newArticle)
            res.status(200).json(newArticle)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    static deleteArticle(req, res, next){
        article.deleteOne({_id:req.params.id})
        .then(success=>{
            res.status(200).json(success)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    static updateArticle(req, res, next){
        article.updateOne({_id:req.params.id}, {
            title: req.body.title,
            content: req.body.content,
            image_url: req.body.image
        })
        .then(success=>{
            res.status(200).json(success)
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

module.exports = ArticleController