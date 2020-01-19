"use strict"

const routes = require('express').Router()
const articleRouter = require('./article')
const userRouter = require('./user')

routes.use('/users', userRouter)
routes.use('/articles', articleRouter)

module.exports = routes