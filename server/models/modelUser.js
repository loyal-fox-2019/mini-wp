const mongoose = require('mongoose')
const Schema = mongoose.Schema
const hashPassword = require('../middleware/encryption')

const userSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "please input valid email"],
        validate: {
            validator: function () {
                return new Promise((res, rej) => {
                    User.findOne({ email: this.email })
                        .then(data => {
                            if (data) {
                                res(false)
                            } else {
                                res(true)
                            }
                        })
                        .catch(err => {
                            res(false)
                        })
                })
            }
        }, message: "Email already taken"
    }
})

userSchema.pre("save", function () {
    let hashed = hashPassword(this.password)
    this.password = hashed
})
const User = mongoose.model("User", userSchema)

module.exports = User