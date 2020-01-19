const Article = require('../models/article')
const mongoose = require('mongoose')
const axios = require('axios')

class Controller {

    static getAllArticle(req, res, next) {
        Article.find().populate('creator', 'name').sort('-created_at')
            .then((articles) => {
                res.status(200).json(articles)
            }).catch(next);
    }

    static getMyArticle(req, res, next) {
        Article.find({ creator: req.decoded.id }).populate('creator', 'name').sort('-created_at')
            .then((article) => {
                res.status(200).json(article)
            }).catch(next);
    }

    static createArticle(req, res, next) {
        console.log(req.body);

        let createInput = {}
        createInput.creator = req.decoded.id
        for (const request in req.body) {
            if (req.body[request]) createInput[request] = req.body[request]
        }
        if (createInput.image == '') createInput.image == this.getRandomPicture()

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

    static async getRandomPicture() {
        let image_url = await axios.get('https://api.unsplash.com/photos/random', {
            headers: {
                Authorization: process.env.UNSPLASH_KEY
            }
        })
        return image_url.urls.regular
    }

}

module.exports = Controller