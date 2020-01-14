const mongoose = require('mongoose')
const Schema = mongoose.Schema


const SchemaArticle = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {type: String},
    created_at: {type: Date},
    image:{type: String},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
})


const Article = mongoose.model('Article', SchemaArticle)

module.exports = Article