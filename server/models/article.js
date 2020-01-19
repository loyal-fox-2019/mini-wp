const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const articleSchema = new Schema({    
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        //required: true,
        ref: "User" 
    },
    featured_image: {
        type: String
    },
    slug: {
        type: String
    },
}, {timestamps : true},{versionKey : false});   //timestamps add createdAt, updatedAt fields

articleSchema.pre('save',function(next) {
    this.author = ObjectId(this.author);    

    next()
})

const Article = mongoose.model("Article",articleSchema);

module.exports = Article;