module.exports = (err, req, res, next) => {
    switch (err.status) {
        case 400:
            res.json({
                status: 400,
                msg: err.msg
            })
            break;

        case 401:
            res.json({
                status: 401,
                msg: err.msg
            })
            break;

        case 404:
            res.json({
                status: 404,
                msg: err.msg
            })

        default:
            res.json(err)
            break;
    }
}
