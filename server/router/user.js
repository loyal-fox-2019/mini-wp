'use strict';

var express = require('express');
var router = express.Router();
const UserController = require('../controllers/userController');

router.get('/', UserController.findAll);
router.post('/register', UserController.create);
router.delete('/:id', UserController.delete);
router.post('/login', UserController.login);
router.post('login-google', UserController.loginGoogle);
// router.delete('/:id', UserController.delete);
// router.patch('/:id', UserController.update);

module.exports = router;
