const api = require("express").Router();

const articlesRouter = require("./articles");
const usersRouter = require("./users");

api.use('/articles',articlesRouter);
api.use('/users',usersRouter);

module.exports = api;