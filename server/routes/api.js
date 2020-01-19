const api = require("express").Router();

const articlesRouter = require("./articles");
const usersRouter = require("./users");


const generateTokenGoogle = require("../middlewares/generateTokenGoogle");
const verifyGoogleToken = require("../middlewares/verifyGoogleToken");
api.post('/gsignin',verifyGoogleToken,generateTokenGoogle);

api.use('/articles',articlesRouter);
api.use('/users',usersRouter);

module.exports = api;