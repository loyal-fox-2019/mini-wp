const { verifyToken } = require('../helpers/jwt')
const Model = require('../models/article')

module.exports = (req, res, next) => {
    Model.findById(req.params.id)
        .then(article => {
            if (article) {
                if (req.loginData.id != article.author) {
                    let err = {
                        name: 'Unauthorized',
                        message: 'You Don\'t have access to this Article'
                    }
                    throw err
                } else {
                    next()
                }
            } else {
                let err = {
                    name: 'No Article',
                    message: 'Cannot Find Article'
                }
                throw err
            }
        })
        .catch(next)
}