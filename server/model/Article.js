const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title:{
        type: String,
        required: [true, 'title is required']
    },
    content:{
        type: String,
        required: [true, 'content is required']
    },
    createdAt:{
        type: Date,
    },
    updatedAt:{
        type: Date
    },
    Author:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    featuredImage:{
        type: String
    },
    TagList:[{
        type: String
    }]

})

const Article = mongoose.model('Article', articleSchema)
module.exports = Article