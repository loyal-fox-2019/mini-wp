const article = require('../models/articles')

class ArticleController {
    static getAllArticles(req, res, next){
        // console.log('discover');
        
        article.find({status: true}).populate('authorID', 'name').sort({created_at: 'desc'})
        .then(articles=>{
            res.status(200).json(articles)
        })
        .catch(err=>{
            next('Internal Server Error')
        })
    }

    static createArticle(req, res, next){
        // console.log(req.body)
        let tagList = req.body.tags.split('#')
        tagList = tagList.filter(element=> element != '')
        // console.log(tagList)
        // console.log(req.loggedUser.id)
        article.create({
           title: req.body.title,
           content: req.body.content,
           image_url: req.body.image_url,
           tags: tagList ,
           authorID: req.loggedUser.id,
           status: req.body.status,
           created_at: new Date() 
        })
        .then(newArticle=>{
            // console.log(newArticle)
            return article.find({authorID:req.loggedUser.id}).populate('authorID', 'name').sort({created_at: 'desc'})
        })
        .then(myArticles=>{
            res.status(200).json(myArticles)
        })
        .catch(err=>{
            next('Failed to create Article')
        })
    }

    static deleteArticle(req, res, next){
        article.findOne({_id:req.params.id})
        .then(targetArticle=>{
            if(targetArticle.authorID!=req.loggedUser.id){
                next()
            }else{
                return article.deleteOne({_id:req.params.id})
            }
        })
        .then(success=>{
            if(success.deletedCount==1){
                return article.find({authorID:req.loggedUser.id}).populate('authorID', 'name').sort({created_at: 'desc'})
            }else{
                next('Failed to Delete Article')
            }
        })
        .then(updatedArticles=>{
            res.status(200).json(updatedArticles)
        })
        .catch(err=>{
            next('Failed to Delete Article')
        })
    }

    static updateArticle(req, res, next){
        article.updateOne({_id:req.params.id}, {
            title: req.body.title,
           content: req.body.content,
           image_url: req.body.image_url,
           tags: tagList ,
           authorID: req.loggedUser.id,
           status: req.body.status,
        })
        .then(success=>{
            res.status(200).json(success)
        })
        .catch(err=>{
            next('Failed to Edit Article')
        })
    }

    static findMyArticles(req, res, next){
        // console.log('myarticles');
        article.find({authorID:req.loggedUser.id}).populate('authorID', 'name').sort({created_at: 'desc'})
        .then(myArticles=>{
            res.status(200).json(myArticles)
        })
        .catch(err=>{
            next('Failed to load My Article')
        })
    }
}

module.exports = ArticleController