const api = require("express").Router();

const express = require("express");
api.use(express.urlencoded({extended:true}));

const articlesRouter = require("./articles");

api.use('/articles',articlesRouter);


module.exports = api;