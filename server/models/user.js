const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {hash} = require('../helpers/encrypt')

const userSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'email is not valid'],
        validate: {
            validator: function (v) {
                User.findOne({ email: v })
                    .then((user) => {
                        return user ? false : true
                    })
                    .catch(err => console.log(err))
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    picture:{
        type: String
    }
})

userSchema.pre('save', function(next){
    this.password = hash(this.password)
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User