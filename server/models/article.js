const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    created_at: {
        type: Date
    },
    picture: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article