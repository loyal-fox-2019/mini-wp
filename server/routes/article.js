const express = require('express');
const { ArticleController } = require('../controllers');

const router = express.Router();

// create
router.post('/', ArticleController.create);

// read all
router.get('/', ArticleController.readAll);

// read one
router.get('/:id', ArticleController.readOne);

// update
router.put('/:id', ArticleController.update);

// destroy
router.delete('/:id', ArticleController.destroy);

module.exports = router;
