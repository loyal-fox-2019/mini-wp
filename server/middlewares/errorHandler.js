module.exports = function (err, req, res, next) {  
    console.log(err)
    let status = 500
    message = 'internal server error'

    res.status(status).json({
        message
    })
}

// driver: true,
// name: 'MongoError',
// index: 0,
// code: 11000,
// keyPattern: { title: 1 },
// keyValue: { title: 'express js' },