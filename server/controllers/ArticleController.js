const Article = require('../models/Article')

class ArticleController {
   static async create(req, res, next) {
      try {
         const {title, content, featured_image, tags, audience} = req.body

         const inputs = {}
         inputs.author = req.authorId

         if(title) inputs.title = title
         if(content) inputs.content = content
         if(featured_image) inputs.featured_image = featured_image
         if(tags) inputs.tags = tags
         if(audience) inputs.audience = audience


         const article = await Article.create(inputs)

         res.status(201).json({article})
      }
      catch (error) {
         next(error)
      }
   }

   static async read(req, res, next) {
      try {
         const limit = req.query.limit || 5
         const page = req.query.page || 1

         const articles = await Article.find({
            $or: [
               {audience: 'public'},
               {author: req.authorId}
            ]
         })
         .limit(limit)
         .page(limit * (page - 1))

         res.status(200).json({articles})
      }
      catch (error) {
         next(error)
      }
   }

   static async readDetail(req, res, next) {
      try {
         const article = await Article.findOne({_id: req.params.articleId})
         res.status(200).json({article})
      }
      catch (error) {
         next(error)
      }
   }

   static async updateOne(req, res, next) {
      try {
         const {title, content, featured_image, tags, audience} = req.body

         const inputs = {}

         if(title) inputs.title = title
         if(content) inputs.content = content
         if(featured_image) inputs.featured_image = featured_image
         if(tags) inputs.tags = tags
         if(audience) inputs.audience = audience

         const results = await Article.updateOne(
            {_id: req.params.articleId},
            inputs
         )

         res.status(200).json({results})
      }
      catch (error) {
         next(error)
      }
   }

   static async deleteOne(req, res, next) {
      try {
         const results = await Article.findOneAndRemove({_id: req.params.articleId})
         res.status(200).json({results})
      }
      catch (error) {
         next(error)
      }
   }
}


module.exports = ArticleController