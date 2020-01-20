'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
const ArticleSchema = new Schema({
    title: {
        type:String,
        required:[true,'you must enter your title']
    },
    content: {
        type:String
    },
    star: {
        type: Boolean,
        default: false
    },
    image:{
        type:String,
        default: ''
    },
    tags:{
        type: [String],
        default: []
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
},{timestamps : true},{versionKey : false});

const Model = mongoose.model('Article', ArticleSchema)
module.exports = Model