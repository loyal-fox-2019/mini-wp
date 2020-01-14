const mongoose = require('mongoose'),
  { Schema } = mongoose

const articleSchema = new Schema({
  title: {
    type: String,
    required: [true, 'article must have a title']
  },
  content: {
    type: String,
    required: [true, 'article must have a content']
  },
  featured_image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1558174685-430919a96c8d'
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  tags: [
    {
      type: String
    }
  ]
},{ timestamps: true })

const Article = mongoose.model('Article', articleSchema)

module.exports = Article
