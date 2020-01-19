'use strict';

var express = require('express');
var router = express.Router();
const ArticleController = require('../controllers/articleController');
const auth = require('../middlewares/auth');

router.use(auth.authenticate);
router.get('/', ArticleController.findAll);
router.post('/', ArticleController.create);
router.get('/mine', ArticleController.findMine);

router.get('/:id', ArticleController.findById);
router.use('/:id', auth.authorize);
router.delete('/:id', ArticleController.delete);
router.patch('/:id', ArticleController.update);

module.exports = router;
