const express = require('express')
const router = express.Router()

router.use('/articles', require('./articleRoutes'))
router.use('/users', require('./userRoutes'))
router.use('/gsignin', require('./gsigninRoutes'))

module.exports=router