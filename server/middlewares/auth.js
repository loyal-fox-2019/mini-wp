'use strict';

const User = require('../models/user');
const Article = require('../models/article');
const jwt = require('../helper/jwt');

function authenticate(req, res, next) {
	try {
		let token = jwt.checkToken(req.headers.token);
		User.findById(token.id)
			.then((user) => {
				if (!user) {
					next({ message: 'invalid token' });
				} else {
					req.userId = user.id;
					next();
				}
			})
			.catch(next);
	} catch (err) {
		next(err);
	}
}

function authorize(req, res, next) {
	Article.findById(req.params.id)
		.then((article) => {
			if (article) {
				if (String(article.userId) === req.userId) {
					next();
				} else {
					next({ status: 403, message: 'Unauthorized process!' });
				}
			}
		})
		.catch(next);
}

module.exports = {
	authenticate,
	authorize
};
