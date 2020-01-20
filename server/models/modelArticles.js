const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    content: {
        type: String
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
    file: {
        type: String
    },
    author: {
        type: String
    }
})

const Article = mongoose.model("Article", articleSchema)
module.exports = Article