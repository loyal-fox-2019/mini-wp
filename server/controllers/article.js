const Article = require('../models/article')
const mongoose = require('mongoose')

class Controller {

    static getAllArticle(req, res, next) {
        Article.find().populate('creator', 'name')
            .then((articles) => {
                res.status(200).json(articles)
            }).catch(next);
    }

    static getMyArticle(req, res, next) {
        Article.find({ id: req.decoded.id }).populate('creator', 'name')
            .then((article) => {
                res.status(200).json(article)
            }).catch(next);
    }

    static createArticle(req, res, next) {
        let createInput = {}
        createInput.creator = req.decoded.id
        for (const request in req.body) {
            if (req.body[request]) createInput[request] = req.body[request]
        }

        Article.findOneAndUpdate({ _id: mongoose.Types.ObjectId() }, createInput, {
            upsert: true,
            setDefaultsOnInsert: true,
            new: true,
            runValidators: true
        }).populate('creator', 'name')
            .then((article) => {
                res.status(201).json(article)
            }).catch(next);
    }

    static deleteArticle(req, res, next) {
        Article.findByIdAndDelete(req.params.id)
            .then((article) => {
                res.status(200).json(article)
            }).catch(next);
    }

    static editArticle(req, res, next) {
        let updateInput = {}
        for (const request in req.body) {
            if (req.body[request]) updateInput[request] = req.body[request]
        }

        Article.findByIdAndUpdate(req.params.id, updateInput, { new: true }).populate('creator', 'name')
            .then((article) => {
                res.status(200).json(article)
            }).catch(next);
    }

    static showOneArticle(req, res, next) {
        Article.findById(req.params.id).populate('creator', 'name')
            .then((articles) => {
                res.status(200).json(articles)
            }).catch(next);
    }

}

module.exports = Controller