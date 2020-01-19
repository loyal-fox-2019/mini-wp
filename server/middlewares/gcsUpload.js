const gcsUpload = require('gcs-upload')

const upload = gcsUpload({
  limits: {
    fileSize: 1e6 // in bytes
  },
  gcsConfig: {
    keyFilename: process.env.GCS_KEYFILE,
    bucketName: process.env.GCS_BUCKETNAME
  }
})

module.exports = upload