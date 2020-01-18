const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const hashPassword = require("../helpers/bcrypt").hashPassword; 

const userSchema = new Schema({    
    username: {
        type: String,
        required: [true,"Please enter a username"],
        match: [ /\w+/ ,"Alphanumeric and underscore only"],
        validate: {
            validator: function(uname) {
                let result = false;
                User.findOne({
                    username: uname
                })
                .exec()
                .then((user) => {
                    if(user)
                    {
                        result = false;
                    }
                    result = true;
                })
                .catch((err) => {
                    console.log(err);                    
                })
                return result;
            },
            message: "Username not available"
        }
    },
    password: {
        type: String,
        required: [true,"Please enter a password"]
    },
    login_type: {
        type: String
    },
    profile: {
        type: String
    },
}, {timestamps : true},{versionKey : false});

userSchema.pre('save',function(next) {
    if(!this.profile)
    {
        this.profile = `Hello, I am ${this.username}`;
    }
    this.password = hashPassword(this.password);
    next();
})

const User = mongoose.model("User",userSchema);

module.exports = User;