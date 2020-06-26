const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const articleController = require('../controllers/articleController');

// Home Page
router.get("/", articleController.findAll);

// Register
router.post("/register", userController.register);

// Login
router.post("/login", userController.login);

module.exports = router;
