'use strict';

const express = require('express');
const routes = express.Router();
const ArticleController = require('../controllers/ArticleController');
const upload = require('../middleware/uploadImage');
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');

routes.use(authentication);

routes.get('/', ArticleController.read);

routes.post('/', upload.single('file'), ArticleController.create);

routes.delete('/:id', authorization, ArticleController.delete);

routes.get('/findOne/:id', authorization, ArticleController.findOne);

routes.put('/:id', authorization, ArticleController.update);

module.exports = routes;