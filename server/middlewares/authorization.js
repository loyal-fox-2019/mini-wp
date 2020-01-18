const Article = require('../models/user')

module.exports = (err, req, res, next) => {
    let id = req.loggedIn._id
    try {
        Article.findOne({user_id: id})
            .then(result => {
                if(result){
                    next()
                }else{
                    throw new Error('Not authorized')
                }
            })
    }
    catch(err) {
        res.status(403).json({
            message: 'Not authorized',
            error: err
        })
    }
        
}