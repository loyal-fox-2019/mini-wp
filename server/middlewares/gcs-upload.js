module.exports = gcsUpload({
    limits: {
        fileSize: 1e6 // in bytes
    },
    gcsConfig: {
        keyFilename: 'mini wp-dd0642f03599.json',
        bucketName: 'upload-image'
    }
})
