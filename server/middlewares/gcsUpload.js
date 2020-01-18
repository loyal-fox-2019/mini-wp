const gcsUpload = require('gcs-upload')
module.exports =  gcsUpload({
    limits: {
      fileSize: 1e6 // in bytes
    },
    gcsConfig: {
      keyFilename: 'mini-wp-8721a4584ab2.json',
      bucketName: 'assets-image'
    }
})