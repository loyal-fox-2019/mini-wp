const articlesRouter = require("express").Router();

const ArticleController = require("../controllers/articleController");

const authorisation = require("../middlewares/authorisation").article_authorisation;
const authentication = require("../middlewares/authentication");

const gcsUpload = require("gcs-upload");
const upload = gcsUpload({
    limits: {
      fileSize: 50e6 // in bytes
    },
    gcsConfig: {
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      bucketName: process.env.BUCKETNAME
    }
  })

articlesRouter.get('/',(req,res,next) => {
    //res.send('Article list');
    ArticleController.showAllArticles(req,res,next);
});

articlesRouter.get('/:id',(req,res,next) => {
    //res.send('Article detail');
    ArticleController.showArticleById(req,res,next);
});

articlesRouter.use('/',authentication)

articlesRouter.post('/', upload.single('file'),(req,res,next) => {
    //res.send('add Article');
    ArticleController.addArticle(req,res,next);
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