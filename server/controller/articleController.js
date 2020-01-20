'use strict'

const modelArticle = require('../model/article')

class ArticleController {
    static createArticle(req, res, next) {
        console.log(req.body)
        const { title, content, featured_image } = req.body
        const { userID } = req.userSignedIn

        console.log(featured_image)

        const newArticleData = {
            author: userID,
            title: title,
            content: content
        }
        if (featured_image != undefined) {
            newArticleData.featured_image = featured_image
        } else {
            newArticleData.featured_image = 'no-image'
        }

        modelArticle.create(newArticleData)
            .then(article => {
                res.status(201).json({
                    message: `new article created`,
                    article
                })
            })
            .catch(next)
    }

    static editActicle(req, res, next) {
        console.log(req.body)
        const { articleID } = req.params
        const { title, content, featured_image } = req.body
        const { userID } = req.userSignedIn

        const editArticleData = {
            title: title,
            content: content
        }

        if (featured_image != undefined) {
            editArticleData.featured_image = featured_image
        } else {
            editArticleData.featured_image = 'no-image'
        }

        modelArticle.findByIdAndUpdate(articleID, editArticleData, { new: true, runValidators: true })
            .then(article => {
                res.status(200).json({
                    message: `article with ID ${articleID} updated`,
                    article
                })
            })
            .catch(next)
    }

    static deleteArticle(req, res, next) {
        const { articleID } = req.params
        modelArticle.findByIdAndDelete(articleID)
            .then(article => {
                res.status(200).json({
                    message: `article with ID ${articleID} deleted!`
                })
            })
            .catch(next)

    }
}

module.exports = ArticleController