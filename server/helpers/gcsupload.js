'use strict'

const gcsUpload = require('gcs-upload');

const upload = gcsUpload({
    limits: {
        fileSize: 1e6 // in bytes
    },
    gcsConfig: {
        keyFilename: './gcskey.json',
        bucketName: 'hacktiv8-immersive'
    }
})

module.exports = upload