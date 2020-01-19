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
        let gambar;
        (async () => {
            gambar = await Controller.getRandomPicture()
            req.body.image = gambar.data.urls.regular
            console.log(req.body.image, 'ini dapat');
        })()

        let createInput = {}
        createInput.creator = req.decoded.id
        for (const request in req.body) {
            if (req.body[request]) createInput[request] = req.body[request]
        }

        if (createInput.tags) createInput.tags = createInput.tags.split(',') // split tag
        setTimeout(function () {
            if (createInput.image == 'null') createInput.image = gambar.data.urls.regular
            console.log(createInput, 'ini hasil')
            Article.findOneAndUpdate({ _id: mongoose.Types.ObjectId() }, createInput, {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true,
                runValidators: true
            }).populate('creator', 'name')
                .then((article) => {
                    console.log(article);
                    res.status(201).json(article)
                }).catch(next);

        }, 5000)
    }

    static async getRandomPicture() {
        console.log('generate random picture here');
        try {
            return await axios.get('https://api.unsplash.com/photos/random', {
                headers: {
                    Authorization: 'Client-ID 49f8430fae1a40d4a0227e099c06a7b0228dabe4b7a88c0892ef1ef1ea104c97'
                }
            })
        } catch (error) {
            return error.message
        }
    }

    static deleteArticle(req, res, next) {
        Article.findByIdAndDelete(req.params.id)
            .then((article) => {
                res.status(200).json(article)
            }).catch(next);
    }

    static editArticle(req, res, next) {
        console.log(req.body, 'ini body');
        console.log('=====================');
        let updateInput = {}
        for (const request in req.body) {
            if (req.body[request]) updateInput[request] = req.body[request]
        }

        Article.findOneAndUpdate({_id: req.params.id}, updateInput, { new: true }).populate('creator', 'name')
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