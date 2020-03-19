const mainRouter = require('express').Router();
const articleRouter = require('./article');
const userRouter = require('./user');

mainRouter.use('/articles', articleRouter);
mainRouter.use('/users', userRouter)

module.exports = mainRouter;
