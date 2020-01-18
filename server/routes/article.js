const router = require('express').Router()

router.get('/', (req, res) => {
    res.send('article')
})

module.exports = router