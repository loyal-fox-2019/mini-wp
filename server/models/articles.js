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
    },
    authorID:[{
        type: Schema.Types.ObjectId,
        ref: "users"
    }]
})

const article = mongoose.model('articles', atricleSchema)

module.exports = article