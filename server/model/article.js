'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    author: {
        type: mongoose.Types.ObjectId,
        ref: `User`,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    featured_image: {
        type: String,
    },
    tags: [{
        type: String
    }]

}, { versionKey: false, timestamps: { createdAt: `createdAt`, updatedAt: `updatedAt` } })

const Article = mongoose.model('Article', articleSchema)

module.exports = Article