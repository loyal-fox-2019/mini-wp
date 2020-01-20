const modelUser = require('../models/modelUser')
const modelArticle = require('../models/modelArticles')

function toCreate(req, res, next) {
    modelUser.findById(req.payload.id)
        .then(userFoundToAuthorize => {
            if (userFoundToAuthorize) {
                next()
            } else {
                res.status(403).json({ message: "You are not allowed to do this action" })
            }
        })
        .catch(err => {
            res.status(500).json({ err, message: "Internal server error" })
        })
}

function toEditAndDelete(req, res, next) {

    modelUser.findById(req.payload.id)
        .then(userFoundToAuthorizeEdit => {

            if (userFoundToAuthorizeEdit) {
                return modelArticle.findById(req.params.id).populate(['userId'])
            } else {
                res.status(400).json({ message: "you are not allowed" })
            }
        })
        .then(articleFoundInAuthorize => {
            if (articleFoundInAuthorize.userId._id == req.payload.id) {
                next()
            } else {
                res.status(403).json({ message: "you are not allowed to do this action" })
            }
        })
        .catch(err => {
            res.status(500).json({ err, message: "Internal Server Error" })
        })
}

module.exports = { toCreate, toEditAndDelete }