const Article = require('../model/Article')

class ArticleController{
    static test(req,res)
      {
          res.send('article connected')
      }

    
    static findAll(req,res,next)
      {
          Article.find()
          .populate('Author', 'username email')
          .sort({'createdAt': 'descending'})
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }


    static masterDelete(req,res,next)
      {
          Article.remove()
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }


    static createArticle(req,res,next)
      {
          const { title, content } = req.body
          console.log("TCL: ArticleController -> req.body", req.body)
          const featuredImage = req.body.file || ''
          const tagList = req.body.tagList || []

          
          Article.create({
              title, content, featuredImage,
              Author: req.decodedUser._id,
              tagList,
              createdAt: new Date()
          })
          .then(result=>{
              res.status(201).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }

    
    static findAllFitleredArticles(req,res,next)
      {
          // bikin supaya bisa dynamic dicari by userId / tag / articleId / username
          const key = Object.keys(req.body)

          Article.find({
              [key] : req.body[key]
          })
          // .populate("TagList")
          .populate("Author", "username email")
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })

      }


    static patchUpdateArticle(req,res,next)
      {
          // bikin supaya bisa patch update push and pull tag
          const keys = Object.keys(req.body)
          let updateQuery = {}
          keys.forEach(element => {
              updateQuery[element] = req.body[element]
          });
          console.log("TCL: ArticleController -> updateQuery", updateQuery)
          delete updateQuery.push
          delete updateQuery.pull
          

          if(req.body.push)
            updateQuery.$addToSet = {TagList : req.body.push}
          

          console.log("TCL: ArticleController -> updateQuery", updateQuery)
          
          Article.update(
              { _id: req.params.articleId},
              updateQuery,
              {runValidators: true}
          )
          .then(result=>{
              if(req.body.pull)
                {
                  return Article.update(
                            { _id: req.params.articleId},
                            {$pull : {
                                TagList : {$in : req.body.pull}
                            }}
                         )
                }
              else
                return result
          })
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }


    static deleteArticle(req,res,next)
      {
          Article.remove({
            _id: req.params.articleId
          })
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }

}


module.exports = ArticleController