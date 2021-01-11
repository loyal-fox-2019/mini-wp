const Article = require('../models/article')

module.exports = (req,res,next)=>{
    // console.log(req.payload,'authorization')
    if(req.hasOwnProperty('payload')){
        Article.findById({_id: req.params.id}).populate('author', '-password')
        .then(data=>{
            // console.log(data)
            if(data.author.email===req.payload.email){
                next()
            }else{
                res.json({
                    message: 'user not authorized'
                })
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
}