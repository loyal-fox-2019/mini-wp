'use strict';

const gcsUpload = require('gcs-upload');
const upload = gcsUpload ({
    limits: {
        fileSize: 1e6
    },
    gcsConfig: {
        keyFilename: `${process.argv[1].split('/app.js').join('')}/google-credentials-keyfile-d904fb7cf81f.json`,
        bucketName: 'mini-wp-kirwanm'
    }
});
console.log()
module.exports = upload;