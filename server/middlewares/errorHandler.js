module.exports = function (error, req, res, next) {
    console.log(error)

    let statusCode;
    let messageError = []

    switch (error.name) {
        case 'JsonWebTokenError':
            statusCode = 403
            messageError = error.message
            break;

        default:
            statusCode = error.statusCode || 500
            messageError = error.message || 'Internal Server Error'
            break;
    }

    res.status(statusCode).json({ message: messageError })
}