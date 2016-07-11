'use strict';

var mongoose = require('mongoose');
mongoose.plugin(require('./baseSchema'));
var Schema = mongoose.Schema;

var Classes = new Schema({
	user: { type: Schema.Types.ObjectId, ref: "Users" },
	monday: [{
		subject: String,
		instructor: String,
		room: String,
		starttime: String,
		endtime: String
	}],
	tuesday: [{
		subject: String,
		instructor: String,
		room: String,
		starttime: String,
		endtime: String
	}],
	wednesday: [{
		subject: String,
		instructor: String,
		room: String,
		starttime: String,
		endtime: String
	}],
	thursday: [{
		subject: String,
		instructor: String,
		room: String,
		starttime: String,
		endtime: String
	}],
	friday: [{
		subject: String,
		instructor: String,
		room: String,
		starttime: String,
		endtime: String
	}]
});

module.exports = Classes;