const Article = require('../models/article')

module.exports = (req, res, next) => {
    let id = req.loggedIn.id
    console.log(id)
    try {
        Article.findOne({_id: req.params.id})
            .then(result => {
                if(result.user_id == id){
                    next()
                }else{
                    throw new Error('Not authorized')
                }
            })
    }
    catch(err){
        res.status(403).json({
            message: 'Not authorized',
            err
        })
    }
        
}