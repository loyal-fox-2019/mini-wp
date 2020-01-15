const mongoose = require("mongoose");
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
const url = "mongodb://localhost:27017/mini_wp"
mongoose.connect(url, {useNewUrlParser: true});

const _ = require("underscore");

const Article = require("../models/article");

class ArticleController
{
    static showAllArticles(req,res)
    {
        Article.find()
        .exec()
        .then((articles) => {
            res.status(200).json(articles);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
    }

    static showArticleById(req,res)
    {
        Article.findById(req.params.id)
        .exec()
        .then((article) => {
            res.status(200).json(article);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
    }

    static addArticle(req,res)
    {
        const data = _.pick(req.body,'title','content');
                
        Article.create(data)
        .then((article) => {
            res.status(201).json(article);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
    }
    
    static updateArticle(req,res)
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
                res.status(403).json({
                    msg: "not found"
                });
            }
        })
        .then((updated) => {
            res.status(201).json({
                msg: "update success",
                updated: updated
            });
        })
        .catch((err) => {
            res.status(403).json({
                msg: "not found"
            });
        });
    }

    static deleteArticle(req,res)
    {
        Article.findByIdAndDelete(req.params.id)
        .exec()
        .then(() => {
            res.sendStatus(204);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
    }
}

module.exports = ArticleController;