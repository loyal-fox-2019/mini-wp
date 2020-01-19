const gcsUpload = require('gcs-upload')

const upload = gcsUpload({
    limits: {
        fileSize: 1e6
    },
    gcsConfig: {
        keyFilename: process.env.KEY_FILE,
        bucketName: 'pujangga-senja-image'
    }
})

module.exports = { upload }