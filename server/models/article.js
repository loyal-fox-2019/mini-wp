'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    file: {
        type: String
    },
    title: {
        type: String,
        required: [true, 'Title field cannot be empty']
    },
    content: {
        type: String,
        required: [true, 'Content field cannot be empty']
    },
    author: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'  
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

const Article = mongoose.model('Article', articleSchema);

module.exports = Article