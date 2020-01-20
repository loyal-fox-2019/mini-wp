'use strict'

const modelUser = require('../model/user')
const modelArticle = require('../model/article')

class Authorization {
    static ownArticle(req, res, next) {
        const { userID } = req.userSignedIn
        const articleID = req.params.articleID
        modelArticle.findOne({
            _id: articleID
        })
            .then(article => {
                if (article.author != userID) {
                    throw new Error({

                    })
                }
                else {
                    next()
                }
            })
            .catch(next)
    }
}

module.exports = Authorization