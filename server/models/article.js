"use stric"

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title: {
        type: String,
        maxlength: [50, 'Max Length Title 50']
    },
    content: {
        type: String
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const article = mongoose.model('Article', articleSchema)

module.exports = article