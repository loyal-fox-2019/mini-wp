const express = require('express');
const router = express.Router();
const ArticleCtr = require('../controllers/article');

router.get('/', ArticleCtr.read);
router.post('/', ArticleCtr.create);
router.put('/:id', ArticleCtr.update);
router.delete('/:id', ArticleCtr.delete);

module.exports = router;