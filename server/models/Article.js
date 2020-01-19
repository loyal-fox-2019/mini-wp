const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    due_date: {type: Date, required: true},
    createdAt:{type: Date},
    image: {type: String, required: true},
    userId: {
        // required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Article', articleSchema)