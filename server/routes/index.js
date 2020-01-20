const router = require('express').Router()
const articleRoute = require('../routes/articleRoute')
const userRoute = require('../routes/userRoute')

router.use('/article',articleRoute)
router.use('/user',userRoute)

module.exports = router