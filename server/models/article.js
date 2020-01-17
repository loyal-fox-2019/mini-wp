const { Schema, model } = require('mongoose')

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Article's title is required"],
    },
    content: {
      type: String,
      required: [true, "Article's content is required"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, "Article's author is required"],
    },
    featuredImage: {
      type: String,
    },
    tags: [String],
  },
  { timestamps: true },
)

const article = model('Article', articleSchema)

module.exports = article
