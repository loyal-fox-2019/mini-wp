const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { encryptPassword } = require('../helpers/bcrypt')

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: [{
            validator: (value) => {
                let emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
                return emailRegex.test(value)
            },
            msg: 'Email format Invalid'
        }, {
            validator: (value) => {
                const Model = mongoose.model('User')
                return Model.findOne({ email: value })
                    .then(user => {
                        if (user) return false
                        return true
                    })
            },
            msg: 'Email Already Registered'
        }]
    },
    password: {
        type: String,
        minlength: [6, 'Minimum Password Length : 6'],
        required: true,
    }
})

userSchema.pre('save', function (next) {
    this.password = encryptPassword(this.password)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User