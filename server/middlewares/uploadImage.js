const gcsUpload = require('gcs-upload')

module.exports = gcsUpload({
    limits: {
      fileSize: 1e6 // in bytes
    },
    gcsConfig: {
      keyFilename: 'mini-wp-de6d30ea0822.json',
      bucketName: 'storage-miniwp-mashumuro'
    }
})