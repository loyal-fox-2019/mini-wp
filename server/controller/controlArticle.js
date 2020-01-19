const modelArticle = require('../models/modelArticles')
const modelUser = require('../models/modelUser')

class ControlArticle {
    static publishArticle(req, res, next) {
        let fullName
        modelUser.findById(req.payload.id)
            .then(userKetemuForPublish => {
                fullName = `${userKetemuForPublish.firstName} ${userKetemuForPublish.lastName}`
                return modelArticle.create({
                    userId: userKetemuForPublish._id,
                    title: req.body.title,
                    content: req.body.content,
                    createdAt: new Date(),
                    file: req.body.file,
                    author: fullName
                })
            })
            .then(postCreated => {
                res.status(201).json({ postCreated, message: "post created" })
            })
            .catch(err => {
                res.status(500).json({ err, message: "Internal server error" })
            })
    }
    static myArticles(req, res, next) {
        let mine = []
        modelArticle.find().populate(['userId'])
            .then(allMyArticles => {
                for (let article of allMyArticles) {
                    if (article.userId !== undefined) {
                        if (article.userId._id == req.payload.id) {
                            mine.push(article)
                        }
                    }
                }
                res.status(200).json(mine)
            })
            .catch(err => {
                res.status(500).json({ err, message: "Internal server Error on my Articles" })
            })
    }
    static allArticles(req, res, next) {
        modelArticle.find()
            .then(semuaArticles => {
                res.status(200).json(semuaArticles)
            })
            .catch(err => {
                res.status(500).json({ err, message: "Internal server error" })
            })
    }
    static editArticle(req, res, next) {
        modelArticle.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            content: req.body.content,
            updatedAt: new Date(),
            file: req.body.file
        })
            .then(hasilUpdated => {
                res.status(200).json(hasilUpdated)
            })
            .catch(err => {
                res.status(500).json({ err, message: "Internal server error from edit article" })
            })
    }
    static deleteArticle(req, res, next) {
        modelArticle.findByIdAndDelete(req.params.id)
            .then(hasil => {
                res.status(200).json({ hasil, message: "article successfully deleted" })
            })
            .catch(err => {
                res.status(500).json({ err, message: "Internal server error from delete Article" })
            })
    }
    static getArticleById(req, res, next) {

        modelArticle.findById(req.params.id)
            .then(article => {
                res.status(200).json({ article })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static getArticleByTitle(req, res, next) {
        // console.log("masuk sini", "title")
        modelArticle.find({ title: new RegExp(req.params.title, 'i') })
            .then(allFound => {
                res.status(200).json(allFound)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

}
module.exports = ControlArticle