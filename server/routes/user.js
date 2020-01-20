const express = require('express');
const { UserController } = require('../controllers');
const auth = require('../middlewares/auth');

const router = express.Router();

// register
router.post('/register', UserController.register);

// login
router.post('/login', UserController.login);

// read curr user profile
router.get('/', auth, UserController.readOne);

// update
// router.put('/:userId', UserController.update);

// delete
// router.delete('/:userId', UserController.delete);

module.exports = router;
