const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    created_at:{
        type: Date,
        required: true
    }

})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article