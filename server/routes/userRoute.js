const userCon = require('../controllers/userCon');
// const file = require('../middlewares/gcs-uploader');
const gcsUpload = require('gcs-upload');
const route = require('express').Router();


route.post('/register',userCon.create)
route.post('/login',userCon.login)
route.post('/google',userCon.google)

module.exports = route
