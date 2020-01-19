const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  featured_image: {
    type: String
  },
  tags: [{
    type: String
  }],
  status: {
    type: String
  },
  slug: {
    type: String
  },
  created_at: {
    type: Date
  }
});

const articleModel = mongoose.model("Article", articleSchema);

module.exports = articleModel;