const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullname: {
        type: String,
        required: [true, 'fullname cannot be empty']
    },
    email: {
        type: String,
        required: [true, 'email cannot be empty'],
        unique: [true, 'email already taken'],
        validate: {
            validator: function (email) {
                const emailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                if (!emailFormat.test(email)) {
                    return false
                }
            }
        }
    },
    password: {
        type: String,
        required: [true, 'password cannot be empty'],
        minlength: [6, 'password min. 6 characters']
    }
});

userSchema.pre('save', function (next) {
    const hashPassword = require('../helpers/hashPassword');
    this.password = hashPassword(this.password)
    next()
})

module.exports = mongoose.model('Users', userSchema)