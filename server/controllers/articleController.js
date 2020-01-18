const _ = require("underscore");

const Article = require("../models/article");

class ArticleController
{
    static showAllArticles(req,res,next)
    {
        Article.find()
        .exec()
        .then((articles) => {
            res.status(200).json(articles);
        })
        .catch((err) => {
            next(err);
        })
    }

    static showArticleById(req,res,next)
    {
        Article.findById(req.params.id)
        .exec()
        .then((article) => {
            res.status(200).json(article);
        })
        .catch((err) => {
            next(err);
        })
    }

    static addArticle(req,res,next)
    {
        const data = _.pick(req.body,'title','content');
                
        Article.create(data)
        .then((article) => {
            res.status(201).json(article);
        })
        .catch((err) => {
            next(err);
        });
    }
    
    static updateArticle(req,res,next)
    {
        const data = _.pick(req.body,'title','content');

        Article.findById(req.params.id)
        .exec()
        .then((article) => {
            if(article)
            {
                for(let key in article)
                {
                    if(data.hasOwnProperty(key))
                    {
                        article[key] = data[key];
                    }
                }

                return article.save()                
            }
            else
            {
                next({status: 404, message: "not found"})
            }
        })
        .then((updated) => {
            res.status(201).json({
                msg: "update success",
                updated: updated
            });
        })
        .catch((err) => {
            next(err)
        });
    }

    static deleteArticle(req,res,next)
    {
        Article.findByIdAndDelete(req.params.id)
        .exec()
        .then(() => {
            res.sendStatus(204);
        })
        .catch((err) => {
            next(err);
        })
    }
}

module.exports = ArticleController;