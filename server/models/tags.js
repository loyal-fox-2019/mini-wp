const mongoose = require('mongoose')
const { Schema } = mongoose

const tagSchema = new Schema({
    name: {
        type: String
    }
})

const tag = mongoose.model('tags', tagSchema)

module.exports = tag