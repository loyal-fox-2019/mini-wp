const articleCon = require('../controllers/articleCon');
// const file = require('../middlewares/gcs-uploader');
const gcsUpload = require('gcs-upload');
const route = require('express').Router();


const upload = gcsUpload({
    limits: {
      fileSize: 1e6 // in bytes
    },
    gcsConfig: {
      keyFilename: '/home/jpetra/Documents/Phase\ 2/jovipetra-bd211966abec.json',
      bucketName: 'miniwp-images-jovi'
    }
})

route.post('/',upload.single('file'),articleCon.create)
route.get('/',articleCon.readPublished)
route.post('/drafts',articleCon.readDrafts)
route.get('/:id',articleCon.readId)
route.get('title/:title',articleCon.readTitle)
route.put('/:id',upload.single('file'),articleCon.update)
route.delete('/:id',articleCon.delete)

module.exports = route
