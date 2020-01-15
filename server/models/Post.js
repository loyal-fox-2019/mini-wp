const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    article: {
        type: String
    },
    author: {
        type: String
    },
    categories: [],
    image: {
        type:String
    },
    comments: []
}, {
    timestamps: { 
        createdAt: 'created_at', 
        updatedAt: 'updated_at' 
    }
})

const Post = mongoose.model('Posts', postSchema)

module.exports = Post