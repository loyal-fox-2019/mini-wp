"use strict"

module.exports = function (err, req, res, next) {
    if (err._message === "Article validation failed") {
        res.status(400).json(err.message)
    } else if (err.status === 404) {
        res.status(err.status).json(err.message)
    } else if (err.status === "no found") {
        res.status(404).json(err.message)
    }
}