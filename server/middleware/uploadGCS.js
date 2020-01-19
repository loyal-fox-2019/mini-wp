const gcsUpload = require('gcs-upload')
// const myBucket = "mini-wp-bucket-amel"
const myBucket = process.env.BUCKET_NAME
// const fileName = 'Mini-WP-356cb40766d0.json' //->buat wp bucket amel
const fileName = process.env.KEY_FILE_NAME

const upload = gcsUpload({
    limits: {
        fileSize: 1e6 // in bytes
    },
    gcsConfig: {
        keyFilename: fileName,
        bucketName: myBucket
    }
})

module.exports = upload 