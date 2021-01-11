"use strict"

module.exports = function (err, req, res, next) {
    console.log(err.message, 'ini err message')
    console.log(err._message, 'ini err _message')
    console.log(err.status)
    console.log(err)
    if (err._message === "Article validation failed") {
        res.status(400).json(err)
    } else if (err.status === 404) {
        res.status(err.status).json(err.message)
    } else if (err.status === "no found") {
        res.status(404).json(err.message)
    } else if (err.status === 403) {
        res.status(err.status).json(err.message)
    } else if (err.status === 500) {
        res.status(err.status).json(err.message)
    } else if (err._message === "User validation failed") {
        res.status(400).json(err.message)
    } else if (err.message === "Cannot destructure property `email` of 'undefined' or 'null'.") {
        res.status(400).json(err.message)
    } else if (err.status === 400) {
        res.status(err.status).json("email/password wrong")
    }
}