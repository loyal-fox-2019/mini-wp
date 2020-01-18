module.exports = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        res.status(400).json({ message: err.message })
    } else if (err.name === 'login failed') {
        res.status(400).json({ message: err.message })
    } else {
        console.log(err)
    }
}