'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema ({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    content: {
        type: String
    },
    created_At: {
        type: Date,
        default: new Date()
    },
    file: {
        type: String
    },
    UserId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    }
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;