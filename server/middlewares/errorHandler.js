module.exports = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        res.status(400).json({ message: err.message })
    } else if (err.name === 'login failed') {
        res.status(400).json({ message: err.message })
    } else if (err.name === 'Token Validation') {
        res.status(400).json({ message: err.message })
    } else if (err.name === 'Unauthorized') {
        res.status(403).json({ message: err.message })
    } else if (err.name === 'No Article') {
        res.status(404).json({ message: err.message })
    } else if (err.name === 'CastError') {
        res.status(404).json({ message: "Cannot find Article" })
    }
    else {
        console.log(err)
    }
}