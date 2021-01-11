const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamp = require('mongoose-timestamp2')
const {hashPassword} = require('../helpers/bcrypt')

const authorSchema = new Schema({
   username: {
      type: String,
      required: [true, 'Must insert username']
   },

   email: {
      type: String,
      required: [true, 'Must insert email'],
      validate: {
         validator: function(emailValue) {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailValue)
         }
      }
   },

   password: {
      type: String,
      required: [true, 'Must insert password']
   },

   articles: [{
      type: Schema.Types.ObjectId,
      ref: 'Article'
   }],

   tags: [{type: String}]
})

authorSchema.plugin(timestamp)

authorSchema.pre('save', function(next) {
   this.password = hashPassword(this.password)
   next()
})

const Author = mongoose.model('Author', authorSchema)

module.exports = Author