const gcsUpload = require('gcs-upload')

const upload = gcsUpload({
    limits: {
      fileSize: 1e6 // in bytes
    },
    gcsConfig: {
      keyFilename: '/Users/okka.linardi/Documents/day2(botstrap+vue)/mini-wp/server/Hacktiv8-MiniWP-37e8584cb53f.json',
      bucketName: 'hacktiv8-miniwp-storage'
    }
  })

  module.exports = upload