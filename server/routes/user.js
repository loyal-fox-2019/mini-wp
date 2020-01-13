'use strict';
const router = require('express').Router();
const { userController } = require('../controllers');

router.post('/register', userController.registerUser);
router.post('/', userController.userLogin);

module.exports = router;