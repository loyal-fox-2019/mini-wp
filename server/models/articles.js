'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const articleSchema = new Schema({
        title: {
            type: String,
            required: [true, 'the article field cannot be empty']
        },
        content: {
            type: String,
            required: [true, 'the content field cannot be empty']
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Article', articleSchema)

