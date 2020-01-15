'use strict'

const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new Schema ({
  username: {
    type: String,
    require: [true, 'Username cannot be empty']
  },
  email: {
    type: String,
    required: [true, 'Email cannot be empty'],
    unique: true,
    validate: {
      validator: (value) => {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
      },
      msg: 'Email is not valid'
    }
  },
  password: {
    type: String,
    required: [true, 'Password cannot be empty']
  }
})

userSchema.pre('save', function (next) {
  const salt = bcrypt.genSaltSync(11)
  this.password = bcrypt.hashSync(this.password, salt)
  next()
})

const User = model('User', userSchema)

module.exports = User