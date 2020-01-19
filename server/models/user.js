const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        validate: [
            {
                validator: values => {
                    var re = /\S+@\S+\.\S+/;
                    return re.test(values);
                },
                message: props => `${props.value} is not a valid email`
            }
        ],
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Minimun 6 character']
    }
})

userSchema.pre('save', function(next){
    var salt = bcrypt.genSaltSync(8)
    var hash = bcrypt.hashSync(this.password, salt)

    this.password = hash

    next()
})

const User = mongoose.model('user', userSchema)

module.exports = User