const Tag = require('../model/Tag')

class TagController{
    static test(req,res)
      {
          res.send('tag connected')
      }


    static findAll(req,res,next)
      {
          
      }

    
    static masterDelete(req,res,next)
      {

      }

    
    static createTag(req,res,next)
      {

      }

    
    static findOneTag(req,res,next)
      {
          
      }

    
    static findAllConditionedTag(req,res,next)
      {

      }


    static patchUpdateTag(req,res,next)
      {
          // buat push pull articleId ke dalam Tag
      }

    
    static deleteZeroContentTag(req,res,next)
      {

      }


}


module.exports = TagController