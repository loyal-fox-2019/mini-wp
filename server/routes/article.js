"use strict"

const router = require('express').Router()
const articleControllers = require('../controllers/article')
const upload = require('../middleware/uploadImage')
const authentication = require('../middleware/authentication')
const authorize = require('../middleware/authorize')

router.use(authentication)
router.get('/', articleControllers.findAll)
router.get('/:id', articleControllers.findOne)
router.post('/', authorize, upload.single('featured_image'), articleControllers.create)
router.patch('/:id', authorize, articleControllers.update)
router.delete('/:id', authorize, articleControllers.delete)

module.exports = router