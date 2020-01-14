const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamp = require('mongoose-timestamp2')

const articleSchema = new Schema({
   title: {
      type: String,
      required: [true, 'Must insert article title']
   },

   content: {
      type: String,
      required: [true, 'Must insert content']
   },

   author: {
      type: Schema.Types.ObjectId,
      ref: 'Author'
   },

   featured_image: {
      type: String,
      required: [true, 'Must insert featured_image']
   },

   tags: [{
      type: String
   }],

   audience: {
      type: String,
      default: 'private',
      validate: {
         validator: function(audienceValue) {
            if(audienceValue != 'private' && audienceValue != 'public') return false
            else return true
         },

         message: function(props) {
            return `${props.value} has to be "private" or "public"`
         }
      },
      required: [true, 'Audience must be filled']
   }
})

articleSchema.plugin(timestamp)

const Article = mongoose.model('Article', articleSchema)

module.exports = Article