const router = require('express').Router()
const userRoute = require('./user')
const articleRoute = require('./article')

router.use('/user', userRoute)
router.use('/article', articleRoute)

module.exports = router