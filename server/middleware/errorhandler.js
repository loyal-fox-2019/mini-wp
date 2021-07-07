'use strict'

module.exports = function (err, req, res, next) {
    let statusErr, msg
    switch (err.name) {
        case 'ValidationError':
            statusErr= 401
            msg= err.message
            break;
        
        default:
            statusErr= err.status || 500
            msg= err.message || 'server error'
            break;
    }   
    res.status(statusErr).json({message: msg})
}