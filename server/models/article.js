const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArticleSchema = new Schema({
    title: {
        type: String,
        minlength: 4,
        maxlength: 50,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: [{ type: String }],
    image: {
        type: String,
        default: 'https://source.unsplash.com/random/800x600'
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

const Article = mongoose.model('Article', ArticleSchema)

module.exports = Article