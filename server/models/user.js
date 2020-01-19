const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const hashPassword = require('../helpers/hashPassword');

const userSchema = new Schema({
  avatar: {
    type: String
  },
  first_name: {
    type: String,
    required: [true, "First name required"]
  },
  last_name: {
    type: String
  },
  username: {
    type: String,
    required: [true, "Username required"]
  },
  email: {
    type: String,
    required: [true, 'Email required'],
    validate: {
      validator: function (value) {
        return this.model("User")
          .findOne({
            email: value
          })
          .then(email => {
            if (email) {
              return false;
            }
          });
      },
      message: props => `Email ${props.value} already taken`
    }
  },
  password: {
    type: String,
    required: [true, "Password required"]
  },
  created_at: {
    type: Date
  }
});

userSchema.pre("save", function (next) {
  this.password = hashPassword(this.password, 10);
  next();
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;