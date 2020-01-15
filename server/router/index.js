const router = require('express').Router()

router.use('/users', require('./userRouter'))
router.use('/articles', require('./articleRouter'))
router.use('/tags', require('./tagRouter'))

module.exports = router