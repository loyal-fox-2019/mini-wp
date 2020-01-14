const router = require('express').Router()
const articles = require('./articles')

router.get('/', (req, res) => {
    res.send('Welcome Page')
})
router.use('/articles', articles)

module.exports = router