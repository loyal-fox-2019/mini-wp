'use strict';

const router = require('express').Router();
const ArticleController = require('../controllers/ArticleController');

router.get('/', ArticleController.find);
router.get('/:id', ArticleController.findOne);
router.post('/', ArticleController.create);
router.put('/:id', ArticleController.updateOne);
router.delete('/:id', ArticleController.deleteOne);

module.exports = router;