"use stric"

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title: {
        type: String,
        maxlength: [50, 'Max Length Title 50'],
        required: [true, 'Please fill your title']
    },
    content: {
        type: String,
        required: [true, 'Please fill your content']
    },
    featured_image: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

const article = mongoose.model('Article', articleSchema)

module.exports = article