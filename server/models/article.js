const mongoose = require('mongoose');

const { Schema } = require('mongoose');

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      default: ''
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    tag: {
      type: [String]
    },
    featuredImage: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Article', articleSchema);
