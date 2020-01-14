const mongoose = require('mongoose')
const { Schema } = mongoose

const atricleSchema = new Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    image_url: {
        type: String
    },
    created_at: {
        type: Date
    }
})

const article = mongoose.model('articles', atricleSchema)

module.exports = article