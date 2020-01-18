const _ = require("underscore");

const User = require("../models/user");

const comparePassword = require("../helpers/bcrypt").comparePassword;
const generateToken = require("../helpers/jwt").generateToken;

class UserController
{
    static showAllUsers(req,res,next)
    {
        User.find()
        .exec()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((err) => {
            next(err);
        })
    }

    static showUserById(req,res,next)
    {
        User.findById(req.params.id)
        .exec()
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((err) => {
            next(err);
        })
    }

    static addUser(req,res,next)
    {
        const data = _.pick(req.body,'username','password','profile');
        data.login_type = "standard";
        User.create(data)
        .then((user) => {
            res.status(201).json(user);
        })
        .catch((err) => {
            next(err);
        });
    }

    static loginUser(req,res,next)
    {
        const data = _.pick(req.body,'username','password');

        User.findOne({
            username: data.username,
            login_type: "standard"
        })
        .exec()
        .then((user) => {
            if(user && comparePassword(data.password,user.password))
            {
                let payload = {
                    id: user._id,
                    username: user.username
                }
                let token = generateToken(payload)
                res.status(200).json({ 
                    token: token,
                    username: user.username 
                })
            }
            else
            {
                next({ status: 400, message: "Wrong username/password" })
            }
        })
    }
    
    static updateUser(req,res,next)
    {
        const data = _.pick(req.body,'password','profile');

        User.findById(req.params.id)
        .exec()
        .then((user) => {
            if(user)
            {
                for(let key in User)
                {
                    if(data.hasOwnProperty(key))
                    {
                        User[key] = data[key];
                    }
                }

                return User.save()                
            }
            else
            {
                next({status: 404, message: "not found"})
            }
        })
        .then((updated) => {
            res.status(201).json({
                msg: "update success",
                updated: updated
            });
        })
        .catch((err) => {
            next(err)
        });
    }

    static deleteUser(req,res,next)
    {
        User.findByIdAndDelete(req.params.id)
        .exec()
        .then(() => {
            res.sendStatus(204);
        })
        .catch((err) => {
            next(err);
        })
    }
}

module.exports = UserController;