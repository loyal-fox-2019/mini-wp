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
    created_at: {
        type: Date
    },
    user: {
        type: Schema.Types.ObjectId,
        //required: true,
        ref: "User" 
    }
});

articleSchema.pre('save',function(next) {
    //this.user = ObjectId(this.user);
    if(!this.created_at)
    {
        this.created_at = new Date();
    }
    

    next()
})

const Article = mongoose.model("Article",articleSchema);

module.exports = Article;