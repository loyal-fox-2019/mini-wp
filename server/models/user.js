const { Schema, models, model } = require('mongoose')
const bcryptjs = require('bcryptjs')

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Invalid email format',
    ],
    validate: {
      validator: function(email) {
        return models.User.findOne({ email }).then(user => {
          if (user) return false
          return true
        })
      },
      msg: 'Email already registered',
    },
  },
  password: {
    type: String,
    minlength: [6, 'Password length min 6 characters'],
    required: [true, 'Password is required'],
  },
  platform: {
    type: String,
    default: 'normal',
    enum: ['normal', 'google', 'github', 'twitter'],
  },
})

userSchema.post('validate', function(user) {
  user.password = bcryptjs.hashSync(user.password, 10)
})

const user = model('User', userSchema)

module.exports = user
