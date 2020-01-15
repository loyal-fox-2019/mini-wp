const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { generateHash } = require('../helper/bcryptjs')

const userSchema = new Schema({
    username:{
        type: String,
        required: [true, 'username must be provided'],
        unique: true
    },
    email:{
        type: String,
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'wrong email format'],
        required: [true, 'email must be provided'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'password must be provided']
    },
    role:{
        type: String,
        enum: ['user', 'admin']
    }


})


userSchema.pre('save', function(){
    this.password = generateHash(this.password)
})

const User = mongoose.model('User', userSchema)
module.exports = User