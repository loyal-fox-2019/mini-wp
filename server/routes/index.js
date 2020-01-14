const router = require('express').Router()
const PostRoutes = require('./PostRoutes')
router.use('/posts', PostRoutes)

module.exports = router