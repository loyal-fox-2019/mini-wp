'use strict';

const gcsUpload = require('gcs-upload');
const upload = gcsUpload ({
    limits: {
        fileSize: 1e6
    },
    gcsConfig: {
        keyFilename: '/Users/kirwanmolek/google-credentials-keyfile-d904fb7cf81f.json',
        bucketName: 'mini-wp-kirwanm'
    }
});

module.exports = upload;