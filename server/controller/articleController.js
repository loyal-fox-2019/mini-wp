'use strict'

const modelArticle = require('../model/article')

class ArticleController {
    static createArticle(req, res, next) {
        const { title, content, featured_image, tags } = req.body
        const { userID } = req.userSignedIn

        console.log(featured_image)

        const newArticleData = {
            author: userID,
            title: title,
            content: content,
            tags: tags
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

    static getAllArticle(req, res, next) {
        modelArticle.find({
            author: req.userSignedIn.userID
        })
            .then(articles => {
                res.status(200).json({
                    message: 'success',
                    articles
                })
            })
            .catch(next)
    }

    static getDetail(req, res, next) {
        const { articleID } = req.params

        modelArticle.findById(articleID)
            .then(article => {
                res.status(200).json({
                    message: `success`,
                    article
                })
            })
            .catch(next)
    }

    static filterByTags(req, res, next) {
        const { keywordTag } = req.body

        modelArticle.find({
            $and: [
                { tags: keywordTag },
                { author: req.userSignedIn.userID }
            ]
        })
            .then(articles => {
                res.status(200).json({
                    message: `success`,
                    articles
                })
            })
            .catch(next)
    }

    static searchArticle(req, res, next) {
        const { keyword } = req.body

        modelArticle.find({
            $or: [
                { title: keyword },
                { content: keyword },
                { tags: keyword }
            ]
        })
            .then(articles => {
                res.status(200).json({
                    message: `success`,
                    articles
                })
            })
    }

    static editActicle(req, res, next) {
        console.log(req.body)
        const { articleID } = req.params
        const { title, content, featured_image, tags } = req.body
        const { userID } = req.userSignedIn

        const editArticleData = {
            title: title,
            content: content,
            tags: tags
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