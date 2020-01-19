'use strict'

const gcsUpload = require('gcs-upload')
const file = gcsUpload({
  keyFilename: process.env.GOOGLE_CLOUD_KEYFILE,
  bucketName: process.env.GOOGLE_CLOUD_BUCKET
})

