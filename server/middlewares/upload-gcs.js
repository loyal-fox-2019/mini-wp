const gcsUpload = require('gcs-upload')


const upload = gcsUpload({
    limits: {
        fileSize: 2e6 // in bytes
    },
    gcsConfig: {
        keyFilename: '/home/bayuoktari/Documents/Phase 2/Week2/Weekend Portofolio/mini-wp/server/json-gcs-service.json',
        bucketName: 'miniwp-upload'
    }
})

module.exports = upload