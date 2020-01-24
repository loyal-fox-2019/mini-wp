'use strict'

const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")
const saltRounds = 8

const memberSchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    email: {
        type: String,
        required: [true, "Email address is required"],
        unique: [true, "Email is already take"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, "password is required"]
    }
})

memberSchema.pre('save', function() {
    this.passwod = bcrypt.hashSync(this.password, saltRounds)
})

module.exports = mongoose.model("Member", memberSchema)