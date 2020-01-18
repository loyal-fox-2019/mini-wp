const api = require("express").Router();

const articlesRouter = require("./articles");

api.use('/articles',articlesRouter);


module.exports = api;