'use strict';

function authentication(req, res, next) {
    if(req.headers.hasOwnProperty('usertoken')) {
        next();
    } else {
        res.status(400).json({
            name: "BadRequest",
            message: "You have to login first to access this area"
        })
    }
}

module.exports = authentication;