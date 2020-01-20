const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    imgUrl : String,
    created_at : {
        type : Date,
        default : new Date() 
    },
    author : {
        type : String
    },
    status : {
        type : Boolean
    },
    tags : {
        type : Array
    }
});
// Compile model from schema
var Article = mongoose.model('Article', ArticleSchema );

module.exports = Article;
