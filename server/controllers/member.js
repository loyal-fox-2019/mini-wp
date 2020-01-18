'use strict'

const Member = require("../models/members")
const jwt =require('jsonwebtoken')


class memberController {
    static signUp (res, req, next) {
        const obj = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.pasword
        }
        Member.create(obj)
        .then(result => {
            res.status(201).json({message: "Sign Up success"})
        })
        .catch(next)
    }

    static signIn (req, res, next) {
        Member.findOne(req.body.username)

    }
}