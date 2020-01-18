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
    bcrypt.hash(this.password, 6)
        .then(hash => {
            this.password = hash
        })
        .catch(err => {
            console.log(err)
        })
})

const User = mongoose.model('user', userSchema)

module.exports = User