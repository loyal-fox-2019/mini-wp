const jwt = require('jsonwebtoken')
const Article = require('../models/article-model')

class Verif{
    static Authen (req,res,next){
        if(req.headers.token == undefined || req.headers.token == null){
            next({message: 'please signin first'})
        }
        try{
            let userId = jwt.verify(req.headers.token, process.env.SECRET)
            req.userId = userId
            next()
        }catch(err){
            next(err)
        }
    }

    static author (req,res,next){
        Article.findById(req.params.id)
        .then((data)=>{
            if(data !== null){
                if(data.author == req.userId.userId){
                    next()
                }else{
                    next({status:400})
                }
            } else{
                next({status: 400})
            }
        })
        .catch((err)=>{
            next(err)
        })
    }
}

module.exports = Verif