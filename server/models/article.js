'use strict'

const { Schema, model } = require('mongoose')
const ObjectId = Schema.Types.ObjectId

const articleSchema = new Schema ({
  title: {
    type: String,
    required: [true, 'Title cannot be empty'],
  },
  content: {
    type: String,
    required: [true, 'Content cannot be empty'],
  },
  featured_image: {
    type: String
  },
  tags: {
    type: [String]
  },
  author : {
    type: ObjectId,
    ref: 'User'
  }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

articleSchema.pre('save', function (next) {
  const tags = this.tags
  const result = []
  tags.forEach(element => {
    result.push(element.toLowerCase())
  });
  this.tags = result
  next()
})

const Article = model('Article', articleSchema)

module.exports = Article