const gcsUpload = require('gcs-upload')

const upload = gcsUpload({
    limits: {
        fileSize: 1e6
    },
    gcsConfig: {
        keyFilename: 'MiniWP-36eea0251865.json',
        bucketName: 'miniwp-image'
    }
})

module.exports = upload