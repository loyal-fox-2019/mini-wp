const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { hashPassword } = require('../helpers/bcrypt');

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email cannot be blank"],
        unique: [true, "Email has been used"],
        // validate: {
        //     validator: function(value) {
        //     }
        // }
    },
    password: {
        type: String,
        required: [true, "Password cannot be blank"],
        minlength: [6, "Password must at least 6 characters"],
        maxlength: [32, "Password must not more thatn 32 characters"]
    }
});

userSchema.pre("save", function(next) {
    this.password = hashPassword(this.password);
    next();
})

const User = mongoose.model("User", userSchema);

module.exports = User;