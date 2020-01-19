const ArticleModel = require('../models/article')

function authorize(req,res,next) {
    ArticleModel.findById(req.params.id)
    .then(article=>{
        if(req.user.userId == article.userId){
            next()
        }
        else {
            res.status(403).json({
                message: 'User not authorized'
            })
        }
    })
    .catch(err=>{
        console.log(err)
    })

}

module.exports = authorize