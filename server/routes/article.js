const express = require('express');
const router = express.Router();
const Article = require('../controllers/articleController');

// create post
router.post("/create", Article.create);

module.exports = router;
