'use strict';
const router = require('express').Router();
const upload = require('../middlewares/gcsupload');
const authentication = require('../middlewares/authentication');
const { articleController }  = require('../controllers');
const authorization = require('../middlewares/authorization');

router.post('/featuredimage', upload.single('image'), (req, res) => {
  // this endpoint is used to upload 'featured image' to google bucket
  res.status(201).json(req.body.image)
})
router.get('/', articleController.getArticles);
router.get('/search', articleController.searchArticles);
router.get('/:articleId', articleController.readArticle);
router.use(authentication);
router.get('/myarticle', articleController.getMyArticle);
router.post('/', articleController.postNewArticle)
router.put('/:articleId', authorization, articleController.updateArticle);
router.delete('/:articleId', authorization, articleController.removeArticle);
router.patch('/:articleId/addtags', authorization, articleController.addTags);


module.exports = router;