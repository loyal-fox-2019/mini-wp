'use strict'

const mongoose = require('mongoose')
const bcyript = require('bcryptjs')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        validate: {
            validator: function (value) {
                return User.findOne({
                    email: value
                })
                    .then((user) => !user)
            },
            message: props => `email ${props.value} already registred, please try another email address!`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
}, { versionKey: false, timestamps: { createdAt: `createdAt`, updatedAt: `updateAt` } })

userSchema.pre('save', function (next) {
    this.password = bcyript.hashSync(this.password)
    next()
})

const User = mongoose.model(`User`, userSchema)

module.exports = User