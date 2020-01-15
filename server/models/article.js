'use strict'

const { Schema, model } = require('mongoose')
const ObjectId = Schema.Types.ObjectId

const articleSchema = new Schema ({
  title: {
    type: String,
    required: [true, 'Title cannot be empty']
  },
  content: {
    type: String,
    required: [true, 'Content cannot be empty']
  },
  featured_image: {
    type: String
  },
  tags: {
    type: [String]
  },
  userId : {
    type: ObjectId,
    ref: 'User'
  }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

const Article = model('Article', articleSchema)

module.exports = Article