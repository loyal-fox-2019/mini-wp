const router = require('express').Router()
const ArticleController = require('../controllers/articleController')
// const authenticate = require('../helpers/')

router.get('/', ArticleController.findAll)
router.post('/', ArticleController.create)
router.delete('/:id', ArticleController.delete)
router.patch('/:id', ArticleController.update)
router.get('/:id', ArticleController.findOne)

module.exports = router