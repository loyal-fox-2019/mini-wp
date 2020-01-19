'use strict';

const Article = require('../models/article');
const Jwt = require('../helper/jwt');
const User = require('../models/user');

function authorization(req, res, next) {
    let articleTemp = ''
    Article.findOne({_id: req.params.id})
    .then(article => {
        const userToken = Jwt.verifyToken(req.headers.usertoken);
        articleTemp = article
        return User.findOne({_id: userToken.id})
    })
    .then(user => {
        if(articleTemp.author === user.name) {
            next()
        } else {
            res.status(403).json({
                message: "This article isn't yours to edit or delete"
            })
        }
    })
    .catch(error => {
        console.log(error);
    }) 
}

module.exports = authorization;