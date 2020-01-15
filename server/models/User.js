const { Schema, model } = require('mongoose')
const { hash } = require('../helpers/encrypt')

const userSchema = new Schema ({
  name: {
    type: String,
    required: [true, 'Please input your name']
  },
  email: {
    type: String,
    required: [true, 'Email needed for creating account'],
    match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Invalid email format!'],
    validate: {
      validator(email) {
        return User.findOne({
          email
        })
        .then( user => {
          return user ? false : true
        })
      },
      message: 'Email already registered'
    }
  },
  password: {
      type: String,
      minlength: [6, 'Password need to be at least 6 characthers'],
      maxlength: [20, 'Password cannot exceed 20 characters'],
      required: [true, 'Password cannot be empty']
  }
},
{
  timestamps: true
})

userSchema.pre('save', function (next) {
  this.password = hash(this.password)
    next()
})

const User = model('User', userSchema)

module.exports = User