const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hashPassword } = require('../helpers/bcrypt')

const userSchema = new Schema({
    name: {
        type: String,
        required:[true,'Name required']
    },
    email: {
        type: String,
        required: [true,'Email required'],
        unique:[true,'Email must be unique']
    },
    password: {
        type: String,
        required: [true,'Password required']
    },
    tags:Array
})

userSchema.pre('save', function () {
    this.password = hashPassword(this.password)
})

const User = mongoose.model('User',userSchema)

module.exports = User