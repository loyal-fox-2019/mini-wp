'use strict';

const router = require('express').Router();
const ArticleController = require('../controllers/ArticleController');
const upload = require('../middlewares/gcsUpload');
const { authentication, authorization } = require('../middlewares/auth');

router.use(authentication);
router.get('/', ArticleController.find);
router.get('/:id', ArticleController.findOne);
router.post('/', upload.single('file'), ArticleController.create);

router.put('/:id', authorization, ArticleController.updateOne);
router.delete('/:id', authorization, ArticleController.deleteOne);

module.exports = router;