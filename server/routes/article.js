"use strict"

const router = require('express').Router()
const articleControllers = require('../controllers/article')

router.get('/', articleControllers.findAll)
router.get('/:id', articleControllers.findOne)
router.post('/', articleControllers.create)
router.patch('/:id', articleControllers.update)
router.delete('/:id', articleControllers.delete)

module.exports = router