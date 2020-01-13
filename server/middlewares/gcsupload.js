'use strict';
if (process.env.NODE_ENV === 'development') require('dotenv').config();

const gscUpload = require('gcs-upload');

const upload = gscUpload({
  gcsConfig: {
    keyFilename: process.env.GOOGLE_KEYFILENAME,
    bucketName: process.env.GOOGLE_BUCKET_NAME,
  }
})

module.exports = upload;