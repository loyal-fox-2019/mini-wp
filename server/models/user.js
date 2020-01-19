const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const hashPassword = require("../helpers/bcrypt").hashPassword; 

const userSchema = new Schema({    
    username: {
        type: String,
        required: [true,"Please enter a username"],      
        validate: {
            validator: function(uname) {
                User.findOne({
                    username: uname
                })
                .exec()
                .then((user) => {
                    if(user)
                    {
                        return false;
                    }
                    return true;
                    
                })
                .catch((err) => {
                    console.log(err);         
                })
            },
            message: "Username not available"
        }
    },
    password: {
        type: String,
        required: function() {
            return this.login_type == "standard";
        }
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
    if(this.login_type == "standard")
    {
        this.password = hashPassword(this.password);
    }
    
    next();
})

const User = mongoose.model("User",userSchema);

module.exports = User;