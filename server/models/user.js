const { hash } = require('../helpers/bcrypt')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({

    name: {
        type: String,
        minlength: 3,
        required: [true, "Doesn't have name? find one on google"],
        // match: [/[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/g, 'Name must not contain special character'],
        validate: {
            validator: function (v) {
                return User.findOne({ name: v })
                    .then((user) => { if (user) return false })
            },
            message: "Name has been used"
        },
        unique: true
    },
    email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email tidak valid'],
        required: [true, 'email harus diisi'],
        unique: true,
        validate: {
            validator: function (v) {
                return User.findOne({ email: v })
                    .then((user) => { if (user) return false })
            },
            message: "Email has benn used"
        }
    },
    password: {
        type: String,
        required: [true, 'Password harus diisi']
    },
    bookmark: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
    about: String,
    fav_tags: [{ type: String }]


})
UserSchema.pre('save', function (next) {
    this.password = hash(this.password)
    next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User