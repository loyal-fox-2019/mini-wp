const gcsUpload = require('gcs-upload');

const upload = gcsUpload({
  limits: {
    fileSize: 1e6 // in bytes
  },
  gcsConfig: {
    keyFilename: '/Users/me/google-credential-keyfile.json',
    bucketName: 'minivipi.harfialfaraby.com'
  }
})

module.exports = upload;
