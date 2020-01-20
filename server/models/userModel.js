const mongoose = require('mongoose');
const {hasher} = require('../helpers/bcyrpt')

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
});

UserSchema.pre('save', function(){
    this.password = hasher(this.password)
})

// Compile model from schema
var User = mongoose.model('User', UserSchema );

module.exports = User;
