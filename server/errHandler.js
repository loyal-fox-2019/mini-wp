function errMsg(err, req, res, next) {
    // const err = {
    //     message: 'Page Not Found',
    //     status: 404
    // }

    console.log('di err handler', err)
    
    res.status(err.status || 500)
    res.json({
        error: {
            message: err.message
        }
    })
}

module.exports = errMsg