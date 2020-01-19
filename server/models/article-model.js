const mongoose = require('mongoose')
const Schema = mongoose.Schema


const SchemaArticle = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    created_at: {type: Date},
    image:{type: String},
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    tag: [String]
})


const Article = mongoose.model('Article', SchemaArticle)

module.exports = Article