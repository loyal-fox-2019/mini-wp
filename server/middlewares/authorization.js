const Article = require('../models/user')

module.exports = (err, req, res, next) => {
    let id = req.loggedIn.id
    console.log(id)
    try {
        Article.findById(req.params.id)
            .then(result => {
                if(result.user_id == id){
                    next()
                }else{
                    throw new Error('Not authorized')
                }
            })
    }
    catch{
        res.status(403).json({
            message: 'Not authorized',
            err
        })
    }
        
}