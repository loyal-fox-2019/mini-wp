const articlesRouter = require("express").Router();

const ArticleController = require("../controllers/articleController");

const authorisation = require("../middlewares/authorisation").article_authorisation;

articlesRouter.post('/',(req,res,next) => {
    //res.send('add Article');
    ArticleController.addArticle(req,res,next);
});

articlesRouter.get('/',(req,res,next) => {
    //res.send('Article list');
    ArticleController.showAllArticles(req,res,next);
});

articlesRouter.get('/:id',(req,res,next) => {
    //res.send('Article detail');
    ArticleController.showArticleById(req,res,next);
});

articlesRouter.put('/:id',authorisation,(req,res,next) => {
    //res.send('update Article');
    ArticleController.updateArticle(req,res,next);
});

articlesRouter.patch('/:id',authorisation,(req,res,next) => {
    //res.send('update Article');
    ArticleController.updateArticle(req,res,next);
});

articlesRouter.delete('/:id',authorisation,(req,res,next) => {
    //res.send('delete Article');
    ArticleController.deleteArticle(req,res,next);
});

module.exports = articlesRouter;