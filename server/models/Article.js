const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const urlSlug = require('url-slug');
const articleSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title cannot be blank"],
    },
    content: {
        type: String,
    }, 
    created_at: {
        type: Date,
        default: new Date(),
    },
    author: {
        type: Schema.Types.ObjectId,
        required: [true, "There must be someone who made this"],
        ref: "User"
    },
    slug: {
        type: String
    },
    feaured_image: {
        type: String,
    }
});

articleSchema.pre("save", function(next) {
    this.slug = this.slug || urlSlug(this.title);
    next();
})

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;