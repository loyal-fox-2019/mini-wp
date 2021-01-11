"use strict"

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hashPassword } = require('../helpers/bcrypt')

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Required Email"],
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Invalid Email'],
        validate: {
            validator: function (v) {
                return mongoose.models.User.findOne({ email: v })
                    .then((result) => {
                        if (result) {
                            return false
                        } else {
                            return true
                        }
                    }).catch((err) => {
                        console.log(err)
                    });
            },
            message: "Email address already registered"
        }
    },
    password: {
        type: String,
        required: [true, "Required Password"]
    },
    username: {
        type: String,
        maxlength: [10, "Max username 10"],
        required: [true, "Required Your username"]
    },
    picture: {
        type: String
    }
})

userSchema.pre('save', function (next) {
    if (this.password) {
        this.password = hashPassword(this.password)
    }
    next();
});

const user = mongoose.model('User', userSchema)
module.exports = user