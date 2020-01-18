const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
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
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: new Date()
    }
})

const Article = mongoose.model('Article', articleSchema)