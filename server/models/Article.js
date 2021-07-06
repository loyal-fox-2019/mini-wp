'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title cannot be empty'],
  },
  content: {
    type: String,
    required: [true, 'Whoa? You gonna post an article without it content!?'],
  },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  featured_image: {
    type: String,
    required: [true, 'Featured image cannot be empty'],
  },
  tags: [{
    type: String,
  }]
}, { timestamps: true });

const Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;
