const jwt = require('jsonwebtoken')
const Author = require('../models/Author')
const Article = require('../models/Article')

async function authorAuthentication(req, res, next) {
   try {
      if(!req.headers || !req.headers.token) throw {
         errorCode: 400,
         message: 'Need token for authentication'
      }

      const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET)
      const author = await Author.findOne({_id: decoded.authorId})

      if(!author) throw {
         errorCode: 403,
         message: 'This account does not exist in our server.'
      }

      req.authorId = author._id
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
         if(JSON.stringify(article.author) != JSON.stringify(req.authorId)) throw {
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
      const article = await Article.findOne({_id: req.params.articleId})

      if(!article) throw {
         errorCode: 400,
         message: 'The article does not exist in our server.'
      }

      // console.log(req.params.articleId, '---------', article.author, '----------', req.authorId)
      console.log(JSON.stringify(article.author) != JSON.stringify(req.authorId))
      
      if(JSON.stringify(article.author) != JSON.stringify(req.authorId)) throw {
         errorCode: 401,
         message: 'You are not authorized to perform action to this article.'
      }

      next()
   }
   catch (error) {
      next(error)
   }
}

async function authorTagAuthorization(req, res, next) {
   try {
      if(!req.params.id) throw {
         errorCode: 400,
         message: 'Please input author id in the parameter'
      }

      if(req.authorId == req.params.id) next()
      else throw {
         errorCode: 401,
         message: 'You are not authorized to update watched-tags of this author'
      }
   }
   catch (error) {
      next(error)
   }
}


module.exports = {
   authorAuthentication,
   authorReadAuthorization,
   authorUpdateDeleteAuthorization,
   authorTagAuthorization
}