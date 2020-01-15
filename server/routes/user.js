'use strict';
const router = require('express').Router();
const { userController, articleController } = require('../controllers');
const authentication = require('../middlewares/authentication');

router.post('/register', userController.registerUser);
router.post('/', userController.userLogin);
router.post('/google-signin', userController.googleLogin);
router.get('/articles', authentication, articleController.getMyArticle);

module.exports = router;