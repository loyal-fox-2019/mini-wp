const jwt = require('jsonwebtoken')
const Author = require('../models/Author')
const Article = require('../models/Article')

async function authorAuthentication(req, res, next) {
   try {
      if(!req.headers || !req.headers.token) throw {
         errorCode: 400,
         message: 'Need token for authentication'
      }

      const authorId = jwt.verify(req.headers.token, process.env.JWT_SECRET)
      const author = await Author.findOne({_id: authorId})

      if(!author) throw {
         errorCode: 403,
         message: 'This account does not exist in our server.'
      }

      req.authorid = author._id
      next()
   }
   catch (error) {
      next(error)
   }
}

async function authorReadAuthorization(req, res, next) {
   try {
      const article = await Article.findOne({_id: req.params.articleId})

      if(!article) throw {
         errorCode: 400,
         message: 'The article does not exist in our server.'
      }

      if(article.audience != 'public') {
         if(article.author != req.authorId) throw {
            errorCode: 401,
            message: 'You are not authorized to read this article.'
         }
      }

      next()
   }
   catch (error) {
      next(error)
   }
}

async function authorUpdateDeleteAuthorization(req, res, next) {
   try {
      const article = await Article({_id: req.params.articleId})

      if(!article) throw {
         errorCode: 400,
         message: 'The article does not exist in our server.'
      }
      
      if(article.author != req.authorId) throw {
         errorCode: 401,
         message: 'You are not authorized to perform action to this article.'
      }
   }
   catch (error) {
      next(error)
   }
}


module.exports = {
   authorAuthentication,
   authorReadAuthorization,
   authorUpdateDeleteAuthorization
}