'use strict'

const Member = require("../models/members")
const jwt =require('jsonwebtoken')
const bcrypt = require("bcrypt")
class memberController {
    static signUp (req, res, next) {
        
        Member.findOne({
            email: req.body.email
        })
        .then(result => {
            if(result) {
                throw ({status: 400, message: 'email is already taken'})
            }
            else {
                const obj = {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                }
                Member.create(obj)
                .then(() => {
                    res.status(201).json({message: "Sign Up success"})
                })
            }
        })
        .catch(next)
    }

    static signIn (req, res, next) {
        Member.findOne({
            email:req.body.email
        })
        .then(result => {
            if(!result){
                throw ({status:400, message: "please enter a correct username and password"})
            } 
            else {
                const compare = bcrypt.compareSync( req.body.password, result.password)
                if(!compare){
                    throw ({status:400, message: "please enter a correct username and password"})
                }
                else {

                    const token = jwt.sign({userId: result.id}, process.env.KEY_TOKEN)
                    res.status(202).json({token: token, userId: result.id})
                }
            }
        })
        .catch(next)

    }
}

module.exports = memberController