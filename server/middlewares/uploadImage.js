const gcsUpload = require('gcs-upload')

module.exports = gcsUpload({
    limits: {
      fileSize: 1e6 // in bytes
    },
    gcsConfig: {
      keyFilename: 'mini-wp-743d656d0977.json',
      bucketName: 'storage-miniwp-mashumuro'
    }
})