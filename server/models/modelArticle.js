const {Schema, model, models} = require('mongoose');

const articleSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'title is required'],
            unique: [true, 'title is already registered'],
            minlength: [10, 'title min length 10 character'],
            maxlength: [30, 'title max length 30 character']
        },
        category: {
            type: String,
            required: [true, 'category is required'],
            minlength: [6, 'title min length 6 character'],
            maxlength: [15, 'title max length 15 character']
        },
        author: [{type: Schema.Types.ObjectId, ref: 'Author'}],
        content: {
            type: String,
            required: [true, 'content is required'],
            minlength: [100, 'title min length 100 character'],
            maxlength: [5000, 'title max length 500 character']
        },
        quillContent: {
            type: Object,
            required: [true, 'content is required'],
        },
        featured_image: String,
        created_at: Date
    }
);

const Article = model('Article', articleSchema);

module.exports = {
    Article
};