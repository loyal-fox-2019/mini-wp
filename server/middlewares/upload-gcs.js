const gcsUpload = require('gcs-upload')


const upload = gcsUpload({
    limits: {
        fileSize: 2e6 // in bytes
    },
    gcsConfig: {
        keyFilename: '/Users/dimaswicaksono/Documents/majestic-phase01/week02/bayu/mini-wp/server/json-gcs-service.json',
        bucketName: 'miniwp-upload'
    }
})

module.exports = upload