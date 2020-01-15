const gcsUpload = require('gcs-upload')
const upload = gcsUpload({
    limits: {
      fileSize: 1e6 // in bytes
    },
    gcsConfig: {
      keyFilename: 'mini-wp-968a33ae9b3e.json',
      bucketName: 'assets-image'
    }
})
console.log(upload)
module.exports = upload
