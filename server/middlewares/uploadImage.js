const gcsUpload = require('gcs-upload')

module.exports = gcsUpload({
    limits: {
      fileSize: 1e6 // in bytes
    },
    gcsConfig: {
      keyFilename: '/home/ilhamabdulm/Documents/Hacktiv8 Batch 38/phase_2/p2_w2/mini-wp/server/middlewares/mini-wp-743d656d0977.json',
      bucketName: 'storage-miniwp-mashumuro'
    }
})