const gcsUpload = require('gcs-upload')


const upload = gcsUpload({
    limits: {
        fileSize: 1e6
    },
    gcsConfig:{
        keyFilename: 'token.json',
        bucketName: 'article-image-miniwp'
    }
})



module.exports = upload
