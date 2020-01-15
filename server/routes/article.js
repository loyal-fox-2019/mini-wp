'use strict';

const express = require('express');
const routes = express.Router();
const ArticleController = require('../controllers/ArticleController');
const upload = require('../middleware/uploadImage');

routes.get('/', ArticleController.read);

routes.post('/', upload.single('file'), ArticleController.create);

routes.delete('/', ArticleController.delete);

routes.get('/findOne/:id', ArticleController.findOne);

routes.put('/:id', ArticleController.update);

module.exports = routes;