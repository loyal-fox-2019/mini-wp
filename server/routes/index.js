const routes = require("express").Router();
const apiRouter = require("./api");

routes.use('/api', apiRouter);

module.exports = routes;