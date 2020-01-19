const express = require('express')
const router = express.Router()
const articlesRouter = require('./articles')
const userRouter = require('./user')

router.use('/articles', articlesRouter)
router.use('/user', userRouter)

module.exports = router