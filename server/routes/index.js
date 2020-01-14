"use strict"

const routes = require('express').Router()
const articleRouter = require('./article')

routes.use('/article', articleRouter)

module.exports = routes