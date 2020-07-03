'use strict'

const router = require('express').Router()
const usersController = require('../controllers/usersController')
const { authentication } = require('../middlewares/auth')
const { multer, sendUploadToGCS } = require("../middlewares/gcs");

router.post('/register', usersController.register)
router.post('/signin', usersController.signIn)
router.post('/googleSignIn', usersController.googleSignIn)
router.put('/edit',
  authentication,
  multer.single("image"),
  sendUploadToGCS,
  usersController.edit
)
router.get('/:id', authentication, usersController.findOne)

module.exports = router;