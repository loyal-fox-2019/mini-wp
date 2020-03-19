const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: {
        type: String,
        // required: [true, 'Title must not be empty']
    },
    content: {
        type: String,
        // required: [true, 'Content must not empty']
    },
    created_at: {
        type: Date
    },
    author: {
        type: String
    },
    featured_image: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, 'Must include userId']
    }
});

articleSchema.pre('save', function (next) {
    this.createdAt = new Date()
    next()
})

module.exports = mongoose.model('Articles', articleSchema)
