const article =  require('./articleRoute');
const user =  require('./userRoute');
const gcsUpload = require('gcs-upload');
const authenticator = require('../middlewares/authenticator');

const upload = gcsUpload({
    limits: {
      fileSize: 1e6 // in bytes
    },
    gcsConfig: {
      keyFilename: '/home/jpetra/Documents/Phase\ 2/jovipetra-bd211966abec.json',
      bucketName: 'miniwp-images-jovi'
    }
  })

const route = require('express').Router();

route.use('/user',user)
route.use(authenticator)
route.use('/article',article)

module.exports = route
