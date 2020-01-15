'use strict'

const articleController = require('../controllers/article')
const express = require('express')
const router = express.Router()

router.get('/', articleController.showAll)
router.post('/new',articleController.create)
router.delete('/:id', articleController.delete)
router.put('/:id', articleController.update)
router.put('/:id', articleController.update)

module.exports = router