"use strict"

const routes = require('express').Router()
const articleRouter = require('./article')

routes.use('/articles', articleRouter)

module.exports = routes