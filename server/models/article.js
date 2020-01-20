'use strict'

const mongoose = require('mongoose')

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  image: {
    type: String,
    default: 'https://www.imgbase.info/images/safe-wallpapers/photography/cityscape/34088_cityscape_monochrome_monochrome_cityscape.jpg'
  },
  tags: [{type: String}],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Author is required']
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    type: String,
    minlength: [1, 'Please input minimum one character for comment']
  }]
},
{
  timestamps: true,
  versionKey: false
});

ArticleSchema.pre('save', function (next) {
  let newTags = []
  this.tags.forEach(tag => {
    tag.toLowerCase()
    if (!newTags.includes(tag)) {
      newTags.push(tag)
    }
  })
  this.tags = newTags;
  next()
})

module.exports = mongoose.model('Article', ArticleSchema)