const gcsUpload = require('gcs-upload');

const upload = gcsUpload({
    limits: {
      fileSize: 1e6 // in bytes
    },
    gcsConfig: {
      keyFilename: '/home/jpetra/Documents/Phase\ 2/jovipetra-bd211966abec.json',
      bucketName: 'miniwp-images-jovi'
    }
})

module.exports = upload