const {Schema, model} = require('mongoose')

const articleSchema = new Schema ({
    title: {
      type: String,
      required: [true, 'Title cannot be empty']
    }, 
    content: {
      type: String,
      required: [true, 'Content cannot be empty']
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }, 
    image: {
      type: String
    },
    tags: {
      type: Array,
      validate: [ arrayLimit, '{PATH}, exceeds the limit of 5' ]
    },
    status: {
      type: String,
      enum: ['publish', 'draft', 'delete']
    }
},
{
  timestamps: true
})

function arrayLimit(value) {
  return value.length <= 5
}

const Article = model('Article', articleSchema)

module.exports = Article