const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title: {
        type: String,
        required: [true,'Title required']
    },
    content: {
        type: String,
        required: [true,'Content required']
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    author: { type: Schema.Types.ObjectId, ref: 'User'},
    featured_image: {
        type: String,
        required: [true,'Featured image required']
    },
    tags: {
        type: Array,
        required: [true,'Input at least 1 tag']
    }
})

const Article = mongoose.model('Article',articleSchema)

module.exports = Article