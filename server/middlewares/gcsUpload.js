const gcsUpload = require('gcs-upload')

const upload = gcsUpload({
    limits: {
      fileSize: 1e6 // in bytes
    },
    gcsConfig: {
      keyFilename: 'mini-wp-783dbf433195.json',
      bucketName: 'mini-wp-upload'
    }
  })

  module.exports = upload