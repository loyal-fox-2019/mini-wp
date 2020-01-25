'use strict';

const User = require('../models/user');
const bcrypt = require('../helper/bcrypt');
const jwt = require('../helper/jwt');

class UserController {
	static findAll(req, res, next) {
		User.find()
			.then((results) => {
				res.status(200).json(results);
			})
			.catch(next);
	}

	static loginGoogle(req, res, next) {
		let email = req.body.email;
		console.log(email);
		User.findOne({
			email : email
		})
			.then((user) => {
				let password = 'kodok';
				if (!user) {
					return User.create({
						name     : email,
						email    : email,
						password
					});
				} else {
					return user;
				}
			})
			.then((user) => {
				let token = jwt.generateToken(user);
				res.status(200).json({
					token
				});
			})
			.catch(next);
	}

	static create(req, res, next) {
		const obj = {
			username : req.body.username,
			email    : req.body.email,
			password : req.body.password
		};
		console.log(obj);
		User.create(obj)
			.then((result) => {
				let token = jwt.generateToken(result);
				res.status(200).json({
					token
				});
			})
			.catch(next);
	}

	static delete(req, res, next) {
		User.findByIdAndDelete(req.params.id)
			.then((result) => {
				res.status(200).json(result);
			})
			.catch(next);
	}

	static login(req, res, next) {
		console.log('ok');
		User.findOne({ email: req.body.email })
			.then((user) => {
				if (!user) {
					next({ message: 'email/password salah' });
				} else {
					if (!bcrypt.checkPassword(req.body.password, user.password)) {
						next({ message: 'email/password salah' });
					} else {
						let token = jwt.generateToken(user);
						res.status(200).json({
							token
						});
					}
				}
			})
			.catch(next);
	}
}

module.exports = UserController;
