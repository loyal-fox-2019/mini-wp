'use strict';

const router = require('express').Router();
const ArticleController = require('../controllers/ArticleController');
const upload = require('../middlewares/gcsUpload');

router.get('/', ArticleController.find);
router.get('/:id', ArticleController.findOne);
router.post('/', upload.single('file'), ArticleController.create);
router.put('/:id', ArticleController.updateOne);
router.delete('/:id', ArticleController.deleteOne);

module.exports = router;