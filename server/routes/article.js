const express = require('express');
const gcsUpload = require('gcs-upload');
const { ArticleController } = require('../controllers');

const router = express.Router();

const upload = gcsUpload({
  limits: {
    fileSize: 1e6
  },
  gcsConfig: {
    keyFilename: './keyfile.json',
    bucketName: 'mini-wp-msuwignyo'
  }
})

// create
router.post('/', upload.single("file"), ArticleController.create);

// read all
router.get('/', ArticleController.readAll);

// read one
router.get('/:id', ArticleController.readOne);

// update
router.put('/:id', upload.single('file'), ArticleController.update);

// destroy
router.delete('/:id', ArticleController.destroy);

module.exports = router;
