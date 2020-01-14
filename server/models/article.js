'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    created_At: {
        type: Date,
        default: new Date()
    }
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;