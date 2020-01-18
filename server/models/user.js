const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const userSchema = new Schema({    
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: String
    },
}, {timestamps : true},{versionKey : false});

userSchema.pre('save',function(next) {
    next()
})

const User = mongoose.model("User",userSchema);

module.exports = User;