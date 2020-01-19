'use strict';

const jwt = require('jsonwebtoken');

function generateToken(user) {
	// console.log('ok');
	// console.log(process.env.JWT_SECRET);
	return jwt.sign({ id: user.id }, process.env.JWT_SECRET);
}

function checkToken(token) {
	return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
	generateToken,
	checkToken
};
