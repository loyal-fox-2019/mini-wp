const articlesRouter = require("express").Router();

const express = require("express");
articlesRouter.use(express.urlencoded({extended:true}));

const ArticleController = require("../controllers/articleController");

articlesRouter.post('/',(req,res) => {
    //res.send('add Article');
    ArticleController.addArticle(req,res);
});

articlesRouter.get('/',(req,res) => {
    //res.send('Article list');
    ArticleController.showAllArticles(req,res);
});

articlesRouter.get('/:id',(req,res) => {
    //res.send('Article detail');
    ArticleController.showArticleById(req,res);
});

articlesRouter.put('/:id',(req,res) => {
    //res.send('update Article');
    ArticleController.updateArticle(req,res);
});

articlesRouter.patch('/:id',(req,res) => {
    //res.send('update Article');
    ArticleController.updateArticle(req,res);
});

articlesRouter.delete('/:id',(req,res) => {
    //res.send('delete Article');
    ArticleController.deleteArticle(req,res);
});

module.exports = articlesRouter;