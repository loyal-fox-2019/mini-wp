'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const araticleSchema = new mongoose.Schema({
	title      : {
		type     : String,
		required : [ true, 'title is required' ]
	},
	content    : {
		type     : String,
		required : [ true, 'content is required' ]
	},
	created_at : {
		type    : Date,
		default : new Date()
	},
	userId     : {
		type : Schema.Types.ObjectId,
		ref  : 'User'
	}
});

const Article = mongoose.model('Article', araticleSchema);

module.exports = Article;
