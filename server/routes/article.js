'use strict';
const router = require('express').Router();
const authentication = require('../middlewares/authentication');
const { articleController }  = require('../controllers');
const authorization = require('../middlewares/authorization');
const gcsUpload = require('gcs-upload')

const upload = gcsUpload({
  gcsConfig: {
    keyFilename: process.env.GOOGLE_KEYFILENAME,
    bucketName: process.env.GOOGLE_BUCKET_NAME,
  }
})

router.post('/image', upload.single('image'), (req, res) => {
  res.status(200).json(req.body.image)
})

router.get('/', articleController.getArticles);
router.get('/search', articleController.searchArticles);
// router.get('/searchall', articleController.allSearch);
router.use(authentication);
// router.get('/:articleId', articleController.readArticle);
router.post('/', articleController.postNewArticle)
router.put('/:articleId', authorization, articleController.updateArticle);
router.delete('/:articleId', authorization, articleController.removeArticle);
router.patch('/:articleId/addtags', authorization, articleController.addTags);


module.exports = router;