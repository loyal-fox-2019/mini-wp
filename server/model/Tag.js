const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tagSchema = new Schema({
    name: {
        type: String,
        required: [true, 'tag title must be provided']
    },
    ArticleList:{
        type: [Schema.Types.ObjectId],
        ref: "Article"
    }
})


const Tag = mongoose.model("Tag", tagSchema)
module.exports = Tag