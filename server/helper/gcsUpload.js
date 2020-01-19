const gcsUpload = require('gcs-upload')
module.exports = gcsUpload({
        limits: {
          fileSize: 1e6 // in bytes
        },
        gcsConfig: {
          keyFilename: process.env.GCREDENTIAL,
          bucketName: 'miniwp-storage-jap'
        }
    })
