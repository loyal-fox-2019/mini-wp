const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { generateHash } = require('../helper/bcryptjs')
const autoUpperCase = require('../helper/autoUpperCase')

const userSchema = new Schema({
    username:{
        type: String,
        required: [true, 'username must be provided'],
        unique: true
    },
    firstName:{
        type: String,
        required: [true, 'firstName must be provided']
    },
    lastName:{
        type: String,
        required: [true, 'lastName must be provided']
    },
    fullName:{
        type: String
    },
    description:{
        type: String
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
    },
    profilePicture:{
        type: String
    }


})


userSchema.pre('save', function(){
    this.password = generateHash(this.password)
    this.fullName = autoUpperCase(this.firstName, this.lastName)
})

userSchema.pre('updateOne', function(next){
    const updateQuery = this.getUpdate()
    console.log(`TCL: updateQuery`, updateQuery)
    updateQuery.fullName = autoUpperCase(updateQuery.firstName, updateQuery.lastName)
    next()
})
const User = mongoose.model('User', userSchema)
module.exports = User