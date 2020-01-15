const gcsUpload = require('gcs-upload')
const upload = gcsUpload({
    limits: {
        fileSize: 1e6 // in bytes
    },
    gcsConfig: {
        keyFilename: '/home/bayuoktari/Documents/Phase 2/Week2/mini-wp/server/middlewares/My-First-Project-94c52fa175d0.json',
        bucketName: 'upload-file-miniwp'
    }
})

module.exports = upload