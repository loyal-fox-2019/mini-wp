'use strict'

const router = require('express').Router()
const articlesController = require('../controllers/articlesController')
const { authorization } = require('../middlewares/auth')

router.post('/', articlesController.create)
router.get('/', articlesController.findAll)
router.patch('/:id/likes', articlesController.like)
router.post('/:id/comments', articlesController.addComment)
router.delete('/:id/comments/:id', articlesController.deleteComment)
router.get('/all/own', articlesController.findMine)
router.get('/filter/:tag', articlesController.filter)

router.use('/:id', authorization)
router.get('/:id', articlesController.findOne)
router.put('/:id', articlesController.edit)
router.delete('/:id', articlesController.destroy)

module.exports = router;