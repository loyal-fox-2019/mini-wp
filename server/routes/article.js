const express = require('express');
const gcsUpload = require('gcs-upload');
const { ArticleController } = require('../controllers');
const auth = require('../middlewares/auth');

const router = express.Router();

const upload = gcsUpload({
  limits: {
    fileSize: 1e6 // in bytes
  },
  gcsConfig: {
    keyFilename: './keyfile.json',
    bucketName: 'mini-wp-markus'
  }
});

router.use(auth);

// create
router.post('/', upload.single('featuredImage'), ArticleController.create);

// read all
router.get('/', ArticleController.readAll);

// read one
router.get('/:articleId', ArticleController.readOne);

// update
router.put(
  '/:articleId',
  upload.single('featuredImage'),
  ArticleController.update
);

// delete
router.delete('/:articleId', ArticleController.delete);

module.exports = router;
