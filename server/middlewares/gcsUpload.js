const gcsUpload = require('gcs-upload')

const upload = gcsUpload({
    limits: {
      fileSize: 1e6 // in bytes
    },
    gcsConfig: {
      keyFilename: 'Hacktiv8-MiniWP-fe5a802e4d05.json',
      bucketName: 'hacktiv8-miniwp-storage'
    }
  })

  module.exports = upload