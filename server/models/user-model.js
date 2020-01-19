const mongoose = require('mongoose')
const Schema = mongoose.Schema
const pas = require('../helper/hash')

const UserSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {
        type: String,
        unique: true,
        required: true,
        validate:{
            validator: function (params) {
                return new Promise(function (resolve, reject) {
                    mongoose.models.User.findOne({email: params})
                    .then((data)=>{
                        if(data === null){
                            resolve(true)
                        }
                        resolve(false)
                    })
                })
                .then((data)=>{
                    return data
                })
            },
            message: props => `${props} already taken`
        }
    },
    password:{
        type: String,
        required:true
    },
    profilePicture: {type: String}
})

UserSchema.pre('save', function(next){
    pas.hash(this.password)
    .then((data)=>{
        this.password = data
        next()
    })
})

const User = mongoose.model('User', UserSchema)

module.exports = User