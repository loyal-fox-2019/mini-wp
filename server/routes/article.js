const express = require('express')
const router = express.Router()
const articleController = require('../controllers/article');
const authorization = require('../middlewares/authorization');
const gcsUpload = require('../middlewares/gcsUpload');

router.get('/', articleController.getAllArticles);
router.post('/', articleController.addArticle);
router.post('/image', gcsUpload.single('file'), articleController.uploadImage);
router.get('/tags/:tagName', articleController.getArticleByTagName);
router.get('/title/:title', articleController.getArticleByTitle);

router.use('/:articleId', authorization);
router.get('/:articleId', articleController.getArticleById);
router.put('/:articleId', articleController.updateArticle);
router.patch('/:articleId', articleController.updateArticle);
router.delete('/:articleId', articleController.deleteArticle);
router.post('/:articleId/tag', articleController.addTagNameToArticle);
router.delete('/:articleId/tag', articleController.deleteTagNameFromArticle);

module.exports = router