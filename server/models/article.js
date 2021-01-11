const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        ref: 'User'
    },
    description: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    featured_image:{
        type: String,
    },
    user_id:{
        type: Schema.Types.ObjectId
    },
    tags: {
        type: [String]
    },
    created_at: {
        type: Date
    }
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article