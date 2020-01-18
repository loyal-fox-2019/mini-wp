module.exports = function (err, req, res, next) {  
    console.log(err)
    let status = 500
    message = 'internal server error'

    res.status(status).json({
        message
    })
}