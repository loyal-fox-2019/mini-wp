'use strict'

const articleController = require('../controllers/article')
const express = require('express')
const router = express.Router()
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

router.get('/', authentication, articleController.showAll)
router.get('/:id',articleController.showOne)
router.post('/new', authentication,articleController.create)
router.delete('/:id', authentication, authorization,articleController.delete)
router.put('/:id', authentication, authorization,articleController.update)
router.patch('/:id', authentication, authorization,articleController.update)

module.exports = router