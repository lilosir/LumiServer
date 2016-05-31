"use strict";

require("babel-polyfill");
var co = require("co");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lumi');

var db = mongoose.connection;
db.on('error', function (err) {
	console.log(err);
});

db.on('disconnected', function () {
	console.log('Datebase disconnected!!');
});

var Users = require('../models/users');
var Notifications = require('../models/notifications');

// clear the database
// Notifications.remove({},function(err, docs) {
//   console.log(docs);
// })

//show sessions
Notifications.find({}, function (err, docs) {
	if (err) {
		console.log(err);
	} else {
		console.log(docs[0]);
	}
}).populate('contents');