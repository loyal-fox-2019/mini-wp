'use strict';

const ArticleRouter = require('./ArticleRouter');
const router = require('express').Router();
const UserController = require('../controllers/UserController');

router.use('/article', ArticleRouter);
router.post('/login', UserController.login);
router.post('/register', UserController.create);
router.post('/gsignin', UserController.googleSignIn);

module.exports = router;