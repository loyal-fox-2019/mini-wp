'use strict';

const Article = require('../models/article');

class ArticleController {
	static findAll(req, res, next) {
		Article.find({})
			.then((results) => {
				res.status(200).json(results);
			})
			.catch(next);
	}

	static findMine(req, res, next) {
		Article.find({
			userId : req.userId
		})
			.then((results) => {
				res.status(200).json(results);
			})
			.catch(next);
	}

	static findById(req, res, next) {
		Article.findById(req.params.id)
			.then((results) => {
				res.status(200).json(results);
			})
			.catch(next);
	}

	static create(req, res, next) {
		const obj = {
			title   : req.body.title,
			content : req.body.content,
			userId  : req.userId
		};
		Article.create(obj)
			.then((result) => {
				res.status(200).json(result);
			})
			.catch(next);
	}

	static delete(req, res, next) {
		Article.deleteOne({ _id: req.params.id })
			.then((result) => {
				res.status(200).json(result);
			})
			.catch(next);
	}

	static update(req, res, next) {
		console.log('ok');
		const obj = {
			title   : req.body.title,
			content : req.body.content
		};

		Article.update({ _id: req.params.id }, obj)
			.then((result) => {
				res.status(200).json(result);
			})
			.catch(next);
	}
}

module.exports = ArticleController;
