'use strict';

const bcrypt = require('bcrypt');

function hashPassword(password) {
	const salt = bcrypt.genSaltSync(8);
	const hash = bcrypt.hashSync(password, salt);
	return hash;
}

function checkPassword(password, database_password) {
	return bcrypt.compareSync(password, database_password);
}

module.exports = {
	hashPassword,
	checkPassword
};
