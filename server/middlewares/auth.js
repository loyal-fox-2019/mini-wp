'use strict'
const { verifyToken } = require('../helpers/jwt')
const User = require('../models/User')
const Article = require('../models/Article')

module.exports = {
    authenticate : (req, res, next) => {
        try {    
            const user = verifyToken(req.headers.token)  
            User.findOne({"_id": user.user._id})
            .then (member => {    
                if (member) {
                    req.user = member
                    next()
                } else {
                    next({
                        message : 'user not Found',
                        status : 404
                    })
                }
            })     
            
        } catch(err) {  
            next(err)    
        }
    },
    authorize : (req, res, next) => {
        Article.findById(req.params.id)
            .then(order => {
                if (order) { 
                    if (String(order.author) == req.user._id) {
                        next()
                    } else {
                        next({
                            status : 401,
                            message : 'Not Authorized'
                        })
                    }
                } else {
                    next({
                        status : 404,
                        message : 'order not found'
                    })
                }
            })
            .catch(next)
    }    
} 