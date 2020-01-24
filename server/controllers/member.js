'use strict'

const Member = require("../models/members")
const jwt =require('jsonwebtoken')


class memberController {
    static signUp (res, req, next) {
        console.log(req.body)
        const obj = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.pasword
        }
        Member.create(obj)
        .then(() => {
            res.status(201).json({message: "Sign Up success"})
        })
        .catch(next)
    }

    static signIn (req, res, next) {
        Member.findOne(req.body.username)
        .then(result => {
            if(!result || result.password !== req.body.password){
                throw ({status:400, message: "please enter a correct username and password"})
            } 
            else {
                const token = jwt.sign(result.id, process.env.KEY_TOKEN)
                res.status(202).json(token)
            }
        })
        .catch(next)

    }
}

module.exports = memberController