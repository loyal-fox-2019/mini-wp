'use strict';
const router = require('express').Router();
const upload = require('../middlewares/gcsupload');

router.post('/featuredimage', upload.single('image'), (req, res) => {
  // this endpoint is used to upload 'featured image' to google bucket
  res.status(201).json(req.body.image)
})

module.exports = router;